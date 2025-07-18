package currency

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"

	"release/testutil/sample"
	currencysimulation "release/x/currency/simulation"
	"release/x/currency/types"
)

// GenerateGenesisState creates a randomized GenState of the module.
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	currencyGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		TokenMap: []types.Token{{Owner: sample.AccAddress(),
			Denom: "0",
		}, {Owner: sample.AccAddress(),
			Denom: "1",
		}}}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&currencyGenesis)
}

// RegisterStoreDecoder registers a decoder.
func (am AppModule) RegisterStoreDecoder(_ simtypes.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)
	const (
		opWeightMsgCreateToken          = "op_weight_msg_currency"
		defaultWeightMsgCreateToken int = 100
	)

	var weightMsgCreateToken int
	simState.AppParams.GetOrGenerate(opWeightMsgCreateToken, &weightMsgCreateToken, nil,
		func(_ *rand.Rand) {
			weightMsgCreateToken = defaultWeightMsgCreateToken
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateToken,
		currencysimulation.SimulateMsgCreateToken(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))
	const (
		opWeightMsgUpdateToken          = "op_weight_msg_currency"
		defaultWeightMsgUpdateToken int = 100
	)

	var weightMsgUpdateToken int
	simState.AppParams.GetOrGenerate(opWeightMsgUpdateToken, &weightMsgUpdateToken, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateToken = defaultWeightMsgUpdateToken
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateToken,
		currencysimulation.SimulateMsgUpdateToken(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))
	const (
		opWeightMsgMintToken          = "op_weight_msg_currency"
		defaultWeightMsgMintToken int = 100
	)

	var weightMsgMintToken int
	simState.AppParams.GetOrGenerate(opWeightMsgMintToken, &weightMsgMintToken, nil,
		func(_ *rand.Rand) {
			weightMsgMintToken = defaultWeightMsgMintToken
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgMintToken,
		currencysimulation.SimulateMsgMintToken(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))
	const (
		opWeightMsgBurnToken          = "op_weight_msg_currency"
		defaultWeightMsgBurnToken int = 100
	)

	var weightMsgBurnToken int
	simState.AppParams.GetOrGenerate(opWeightMsgBurnToken, &weightMsgBurnToken, nil,
		func(_ *rand.Rand) {
			weightMsgBurnToken = defaultWeightMsgBurnToken
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgBurnToken,
		currencysimulation.SimulateMsgBurnToken(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))
	const (
		opWeightMsgTransferToken          = "op_weight_msg_currency"
		defaultWeightMsgTransferToken int = 100
	)

	var weightMsgTransferToken int
	simState.AppParams.GetOrGenerate(opWeightMsgTransferToken, &weightMsgTransferToken, nil,
		func(_ *rand.Rand) {
			weightMsgTransferToken = defaultWeightMsgTransferToken
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgTransferToken,
		currencysimulation.SimulateMsgTransferToken(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))

	return operations
}

// ProposalMsgs returns msgs used for governance proposals for simulations.
func (am AppModule) ProposalMsgs(simState module.SimulationState) []simtypes.WeightedProposalMsg {
	return []simtypes.WeightedProposalMsg{}
}
