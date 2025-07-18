package keeper

import (
	"context"
	"errors"

	"release/x/currency/types"

	"cosmossdk.io/collections"
	errorsmod "cosmossdk.io/errors"
	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) TransferToken(ctx context.Context, msg *types.MsgTransferToken) (*types.MsgTransferTokenResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Owner); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	_, err := k.Token.Get(ctx, msg.Denom)
	if err != nil {
		if errors.Is(err, collections.ErrNotFound) {
			return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, "Denom not found")
		}

		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	}

	if msg.Owner != msg.From {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	senderAddress, err := sdk.AccAddressFromBech32(msg.From)
	if err != nil {
		return nil, err
	}

	recpAddress, err := sdk.AccAddressFromBech32(msg.To)
	if err != nil {
		return nil, err
	}

	sender_currency := k.bankKeeper.GetBalance(ctx, senderAddress, msg.Denom)
	if sender_currency.Amount.Int64() < msg.Amount {
		return nil, errorsmod.Wrap(err, "invalid amount")
	}

	transferCoins := sdk.NewCoins(sdk.NewCoin(msg.Denom, math.NewInt(int64(msg.Amount))))

	if err := k.bankKeeper.SendCoins(ctx, senderAddress, recpAddress, transferCoins); err != nil {
		return nil, err
	}

	return &types.MsgTransferTokenResponse{}, nil
}
