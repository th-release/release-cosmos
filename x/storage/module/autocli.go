package storage

import (
	autocliv1 "cosmossdk.io/api/cosmos/autocli/v1"

	"release/x/storage/types"
)

// AutoCLIOptions implements the autocli.HasAutoCLIConfig interface.
func (am AppModule) AutoCLIOptions() *autocliv1.ModuleOptions {
	return &autocliv1.ModuleOptions{
		Query: &autocliv1.ServiceCommandDescriptor{
			Service: types.Query_serviceDesc.ServiceName,
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "Params",
					Use:       "params",
					Short:     "Shows the parameters of the module",
				},
				{
					RpcMethod: "ListStorage",
					Use:       "list-storage",
					Short:     "List all storage",
				},
				{
					RpcMethod:      "GetStorage",
					Use:            "get-storage [id]",
					Short:          "Gets a storage",
					Alias:          []string{"show-storage"},
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}},
				},
				// this line is used by ignite scaffolding # autocli/query
			},
		},
		Tx: &autocliv1.ServiceCommandDescriptor{
			Service:              types.Msg_serviceDesc.ServiceName,
			EnhanceCustomCommand: true, // only required if you want to use the custom command
			RpcCommandOptions: []*autocliv1.RpcCommandOptions{
				{
					RpcMethod: "UpdateParams",
					Skip:      true, // skipped because authority gated
				},
				{
					RpcMethod:      "CreateStorage",
					Use:            "create-storage [denom] [data]",
					Short:          "Create a new storage",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "data"}},
				},
				{
					RpcMethod:      "UpdateStorage",
					Use:            "update-storage [denom] [data]",
					Short:          "Update storage",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "data"}},
				},
				{
					RpcMethod:      "DeleteStorage",
					Use:            "delete-storage [denom]",
					Short:          "Delete storage",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}},
				},
				// this line is used by ignite scaffolding # autocli/tx
			},
		},
	}
}
