from django.core.exceptions import PermissionDenied, ObjectDoesNotExist
from django.db.models import F
from django.http import JsonResponse, Http404
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Watchlist, Crypto, Transaction, Platform, Holding
from .serializers import WatchlistSerializer, TransactionSerializer
from .utils import Pagination


class TransactionView(ListAPIView):
    permission_classes = [IsAuthenticated]
    pagination_class = Pagination
    serializer_class = TransactionSerializer

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
        amount = int(price_usd) * int(quantity)

        # obj, holding = Holding.objects.get_or_create(user=user, crypto=crypto)
        # obj.quantity = quantity1 = F('quantity') + int(quantity)
        # print(quantity1)
        # print(amount / obj.quantity)
        # print(amount)
        # obj.avg_price = amount / obj.quantity
        # obj.amount = obj.quantity * obj.avg_price
        # obj.save()

        Transaction.objects.create(
            user=user,
            crypto=crypto,
            type=type,
            price_usd=price_usd,
            quantity=quantity,
            amount=amount,
            platform=platform,
            description=description,
        )

        return JsonResponse({
            'Success': 'Transaction successfully added',
        }, status=201)

    def delete(self, request, *args, **kwargs):
        try:
            transaction = Transaction.objects.get(id=request.data['id'])
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
