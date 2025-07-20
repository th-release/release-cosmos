package keeper

import (
	"context"
	"errors"
	"fmt"

	"release/utils"
	"release/x/storage/types"

	"cosmossdk.io/collections"
	errorsmod "cosmossdk.io/errors"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) CreateStorage(ctx context.Context, msg *types.MsgCreateStorage) (*types.MsgCreateStorageResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Owner); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidAddress, fmt.Sprintf("invalid address: %s", err))
	}

	encrypt_denom := utils.HashStringWithSalt(msg.Denom, utils.GenerateShortUUID())

	// Check if the value already exists
	ok, err := k.Storage.Has(ctx, encrypt_denom)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	} else if ok {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidRequest, "index already set")
	}

	var storage = types.Storage{
		Owner: msg.Owner,
		Denom: encrypt_denom,
		Data:  msg.Data,
	}

	if err := k.Storage.Set(ctx, storage.Denom, storage); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	}

	return &types.MsgCreateStorageResponse{}, nil
}

func (k msgServer) UpdateStorage(ctx context.Context, msg *types.MsgUpdateStorage) (*types.MsgUpdateStorageResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Owner); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidAddress, fmt.Sprintf("invalid signer address: %s", err))
	}

	// Check if the value exists
	val, err := k.Storage.Get(ctx, msg.Denom)
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

	var storage = types.Storage{
		Owner: msg.Owner,
		Denom: msg.Denom,
		Data:  msg.Data,
	}

	if err := k.Storage.Set(ctx, storage.Denom, storage); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, "failed to update storage")
	}

	return &types.MsgUpdateStorageResponse{}, nil
}

func (k msgServer) DeleteStorage(ctx context.Context, msg *types.MsgDeleteStorage) (*types.MsgDeleteStorageResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Owner); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrInvalidAddress, fmt.Sprintf("invalid signer address: %s", err))
	}

	// Check if the value exists
	val, err := k.Storage.Get(ctx, msg.Denom)
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

	if err := k.Storage.Remove(ctx, msg.Denom); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, "failed to remove storage")
	}

	return &types.MsgDeleteStorageResponse{}, nil
}
