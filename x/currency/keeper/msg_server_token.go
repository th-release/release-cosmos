package keeper

import (
	"context"
	"errors"
	"fmt"

	"release/utils"
	"release/x/currency/types"

	"cosmossdk.io/collections"
	errorsmod "cosmossdk.io/errors"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) CreateToken(ctx context.Context, msg *types.MsgCreateToken) (*types.MsgCreateTokenResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Owner); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidAddress, fmt.Sprintf("invalid address: %s", err))
	}

	encrypt_denom := utils.HashStringWithSalt(msg.Denom, utils.GenerateShortUUID())

	// Check if the value already exists
	ok, err := k.Token.Has(ctx, encrypt_denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	} else if ok {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "index already set")
	}

	if msg.TotalSupply < 1 {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "totalSupply < 1 error")
	}

	if msg.Decimals < 1 {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "decimals < 1 error")
	}

	if msg.Decimals > 12 {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "decimals > 12 error")
	}

	if msg.InitialPrice < 0 {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "InitialPrice < 0 error")
	}

	if len(msg.Symbol) < 3 {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "symbol length < 3 error")
	}

	if len(msg.Symbol) > 4 {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "symbol length > 4 error")
	}

	var token = types.Token{
		Owner:        msg.Owner,
		Denom:        encrypt_denom,
		Name:         msg.Name,
		Symbol:       msg.Symbol,
		MetadataUrl:  msg.MetadataUrl,
		TotalSupply:  msg.TotalSupply,
		Supply:       0,
		Decimals:     msg.Decimals,
		InitialPrice: msg.InitialPrice,
	}

	if err := k.Token.Set(ctx, token.Denom, token); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	}

	return &types.MsgCreateTokenResponse{}, nil
}

func (k msgServer) UpdateToken(ctx context.Context, msg *types.MsgUpdateToken) (*types.MsgUpdateTokenResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Owner); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidAddress, fmt.Sprintf("invalid signer address: %s", err))
	}

	// Check if the value exists
	val, err := k.Token.Get(ctx, msg.Denom)
	if err != nil {
		if errors.Is(err, collections.ErrNotFound) {
			return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, "index not set")
		}

		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	}

	// Checks if the msg owner is the same as the current owner
	if msg.Owner != val.Owner {
		return nil, errorsmod.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	if msg.TotalSupply < 1 {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "totalSupply < 1 error")
	}

	if msg.Decimals < 1 {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "decimals < 1 error")
	}

	if msg.InitialPrice < 0 {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "InitialPrice < 0 error")
	}

	var token = types.Token{
		Owner:        msg.Owner,
		Denom:        msg.Denom,
		Name:         val.Name,
		Symbol:       val.Symbol,
		MetadataUrl:  msg.MetadataUrl,
		TotalSupply:  msg.TotalSupply,
		Supply:       val.Supply,
		Decimals:     val.Decimals,
		InitialPrice: val.InitialPrice,
	}

	if err := k.Token.Set(ctx, token.Denom, token); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, "failed to update token")
	}

	return &types.MsgUpdateTokenResponse{}, nil
}
