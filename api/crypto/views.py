from django.core.exceptions import PermissionDenied, ObjectDoesNotExist
from django.db.models import F
from django.http import JsonResponse, Http404
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Watchlist, Crypto, Transaction, Platform, Holding
from .serializers import WatchlistSerializer, TransactionSerializer, CryptoSerializer, HoldingSerializer
from .utils import Pagination


class TransactionView(ListAPIView):
    pagination_class = Pagination
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        user = request.user
        crypto = Crypto.objects.get(id=request.data['crypto_id'])
        type = request.data['type']
        price_usd = request.data['price_usd']
        quantity = request.data['quantity']
        platform = Platform.objects.get(id=request.data['platform_id'])
        description = request.data['description']
        date = request.data['date']
        amount = float(price_usd) * float(quantity)

        if type == 'sell' or type == 'Sell':
            holding = Holding.objects.get(user=user, crypto=crypto)
            if float(holding.quantity) - float(quantity) != 0:
                holding.avg_price = (float(holding.total_amount) - amount) / (
                        float(holding.quantity) - float(quantity))
                holding.total_amount = F('total_amount') - float(amount)
                holding.quantity = F('quantity') - float(quantity)
                holding.save()
            else:
                holding.total_amount = 0
                holding.quantity = 0
                holding.avg_price = 0
                holding.save()
        else:
            obj, holding = Holding.objects.get_or_create(user=user, crypto=crypto)
            obj.quantity = F('quantity') + float(quantity)
            obj.total_amount = F('total_amount') + amount
            obj.avg_price = obj.total_amount / obj.quantity
            obj.save()

        Transaction.objects.create(
            user=user,
            crypto=crypto,
            type=type,
            price_usd=price_usd,
            quantity=quantity,
            amount=amount,
            platform=platform,
            description=description,
            date=date,
        )

        return JsonResponse({
            'Success': 'Transaction successfully added',
        }, status=201)

    def delete(self, request, *args, **kwargs):
        try:
            transaction = Transaction.objects.get(id=request.data['id'])
            holding = Holding.objects.get(crypto_id=transaction.crypto_id, user=self.request.user)
            if (holding.quantity - transaction.quantity) != 0:
                holding.avg_price = (holding.total_amount - transaction.amount) / (
                        holding.quantity - transaction.quantity)
                holding.total_amount = F('total_amount') - float(transaction.amount)
                holding.quantity = F('quantity') - float(transaction.quantity)
                holding.save()
            else:
                holding.delete()
            if transaction.user != self.request.user:
                raise PermissionDenied()
            transaction.delete()
            return JsonResponse({'Success': 'Transaction successfully deleted'}, status=200)
        except ObjectDoesNotExist:
            raise Http404


class WatchlistView(ListAPIView):
    serializer_class = WatchlistSerializer
    pagination_class = Pagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        crypto = Crypto.objects.get(id=request.data['crypto_id'])  # todo: change this to id

        if Watchlist.objects.filter(user=request.user, crypto=crypto).exists():
            return JsonResponse({
                'Error': 'Already exists in watchlist'
            }, status=409)
        else:
            Watchlist.objects.create(
                user=request.user,
                crypto=crypto
            )
            return JsonResponse({
                'Success': 'Successfully added to watchlist',
            }, status=201)

    def delete(self, request, *args, **kwargs):
        try:
            watchlist = Watchlist.objects.get(id=request.data['id'])
            if watchlist.user != self.request.user:
                raise PermissionDenied()
            watchlist.delete()
            return JsonResponse({'Success': 'Successfully deleted from watchlist'}, status=200)
        except ObjectDoesNotExist:
            raise Http404


class CryptoView(ListAPIView):
    serializer_class = CryptoSerializer
    pagination_class = Pagination
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Crypto.objects.all()
    search_fields = ['^crypto_name', '^id', '=symbol']
    filter_backends = [SearchFilter, OrderingFilter]


class HoldingView(ListAPIView):
    serializer_class = HoldingSerializer
    pagination_class = Pagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Holding.objects.filter(user=self.request.user)
