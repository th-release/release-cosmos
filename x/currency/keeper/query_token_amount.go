package keeper

import (
	"context"
	"errors"

	"release/x/currency/types"

	"cosmossdk.io/collections"
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (q queryServer) TokenAmount(ctx context.Context, req *types.QueryTokenAmountRequest) (*types.QueryTokenAmountResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	_, err := q.k.Token.Get(ctx, req.Denom)
	if err != nil {
		if errors.Is(err, collections.ErrNotFound) {
			return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, "Denom not found")
		}

		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	}

	recipientAddress, err := sdk.AccAddressFromBech32(req.Address)
	if err != nil {
		return nil, err
	}

	currency := q.k.bankKeeper.GetBalance(ctx, recipientAddress, req.Denom)

	return &types.QueryTokenAmountResponse{
		Amount: currency.Amount.Int64(),
	}, nil
}
