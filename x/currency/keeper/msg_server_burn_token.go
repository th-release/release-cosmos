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

func (k msgServer) BurnToken(ctx context.Context, msg *types.MsgBurnToken) (*types.MsgBurnTokenResponse, error) {
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

	ownerAddress, err := sdk.AccAddressFromBech32(msg.From)
	if err != nil {
		return nil, err
	}

	owner_balance := k.bankKeeper.GetBalance(ctx, ownerAddress, msg.Denom)
	if owner_balance.Amount.Int64()-msg.Amount < 0 {
		return nil, errorsmod.Wrap(err, "invalid amount")
	}

	owner_coins := sdk.NewCoins(sdk.NewCoin(msg.Denom, math.NewInt(int64(msg.Amount))))

	if err := k.bankKeeper.BurnCoins(ctx, types.ModuleName, owner_coins); err != nil {
		return nil, err
	}

	return &types.MsgBurnTokenResponse{}, nil
}
