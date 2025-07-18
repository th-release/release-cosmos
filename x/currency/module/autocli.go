package currency

import (
	autocliv1 "cosmossdk.io/api/cosmos/autocli/v1"

	"release/x/currency/types"
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
					RpcMethod: "ListToken",
					Use:       "list-token",
					Short:     "List all Token",
				},
				{
					RpcMethod:      "GetToken",
					Use:            "get-token [id]",
					Short:          "Gets a Token",
					Alias:          []string{"show-token"},
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
					RpcMethod:      "CreateToken",
					Use:            "create-token [denom] [name] [symbol] [metadata-url] [total-supply] [supply] [decimals] [initial-price]",
					Short:          "Create a new Token",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "name"}, {ProtoField: "symbol"}, {ProtoField: "metadata_url"}, {ProtoField: "total_supply"}, {ProtoField: "supply"}, {ProtoField: "decimals"}, {ProtoField: "initial_price"}},
				},
				{
					RpcMethod:      "UpdateToken",
					Use:            "update-token [denom] [name] [symbol] [metadata-url] [total-supply] [supply] [decimals] [initial-price]",
					Short:          "Update Token",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "name"}, {ProtoField: "symbol"}, {ProtoField: "metadata_url"}, {ProtoField: "total_supply"}, {ProtoField: "supply"}, {ProtoField: "decimals"}, {ProtoField: "initial_price"}},
				},
				{
					RpcMethod:      "MintToken",
					Use:            "mint-token [denom] [amount] [to]",
					Short:          "Send a mint-token tx",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "amount"}, {ProtoField: "to"}},
				},
				{
					RpcMethod:      "BurnToken",
					Use:            "burn-token [denom] [amount] [from]",
					Short:          "Send a BurnToken tx",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "amount"}, {ProtoField: "from"}},
				},
				{
					RpcMethod:      "TransferToken",
					Use:            "transfer-token [denom] [amount] [from] [to]",
					Short:          "Send a TransferToken tx",
					PositionalArgs: []*autocliv1.PositionalArgDescriptor{{ProtoField: "denom"}, {ProtoField: "amount"}, {ProtoField: "from"}, {ProtoField: "to"}},
				},
				// this line is used by ignite scaffolding # autocli/tx
			},
		},
	}
}
