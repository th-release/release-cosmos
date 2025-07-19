package storage

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"

	"release/testutil/sample"
	storagesimulation "release/x/storage/simulation"
	"release/x/storage/types"
)

// GenerateGenesisState creates a randomized GenState of the module.
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	storageGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		StorageMap: []types.Storage{{Owner: sample.AccAddress(),
			Denom: "0",
		}, {Owner: sample.AccAddress(),
			Denom: "1",
		}}}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&storageGenesis)
}

// RegisterStoreDecoder registers a decoder.
func (am AppModule) RegisterStoreDecoder(_ simtypes.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)
	const (
		opWeightMsgCreateStorage          = "op_weight_msg_storage"
		defaultWeightMsgCreateStorage int = 100
	)

	var weightMsgCreateStorage int
	simState.AppParams.GetOrGenerate(opWeightMsgCreateStorage, &weightMsgCreateStorage, nil,
		func(_ *rand.Rand) {
			weightMsgCreateStorage = defaultWeightMsgCreateStorage
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateStorage,
		storagesimulation.SimulateMsgCreateStorage(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))
	const (
		opWeightMsgUpdateStorage          = "op_weight_msg_storage"
		defaultWeightMsgUpdateStorage int = 100
	)

	var weightMsgUpdateStorage int
	simState.AppParams.GetOrGenerate(opWeightMsgUpdateStorage, &weightMsgUpdateStorage, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateStorage = defaultWeightMsgUpdateStorage
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateStorage,
		storagesimulation.SimulateMsgUpdateStorage(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))
	const (
		opWeightMsgDeleteStorage          = "op_weight_msg_storage"
		defaultWeightMsgDeleteStorage int = 100
	)

	var weightMsgDeleteStorage int
	simState.AppParams.GetOrGenerate(opWeightMsgDeleteStorage, &weightMsgDeleteStorage, nil,
		func(_ *rand.Rand) {
			weightMsgDeleteStorage = defaultWeightMsgDeleteStorage
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgDeleteStorage,
		storagesimulation.SimulateMsgDeleteStorage(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))
	const (
		opWeightMsgCreateData          = "op_weight_msg_storage"
		defaultWeightMsgCreateData int = 100
	)

	var weightMsgCreateData int
	simState.AppParams.GetOrGenerate(opWeightMsgCreateData, &weightMsgCreateData, nil,
		func(_ *rand.Rand) {
			weightMsgCreateData = defaultWeightMsgCreateData
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateData,
		storagesimulation.SimulateMsgCreateData(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))
	const (
		opWeightMsgUpdateData          = "op_weight_msg_storage"
		defaultWeightMsgUpdateData int = 100
	)

	var weightMsgUpdateData int
	simState.AppParams.GetOrGenerate(opWeightMsgUpdateData, &weightMsgUpdateData, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateData = defaultWeightMsgUpdateData
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateData,
		storagesimulation.SimulateMsgUpdateData(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))
	const (
		opWeightMsgDeleteData          = "op_weight_msg_storage"
		defaultWeightMsgDeleteData int = 100
	)

	var weightMsgDeleteData int
	simState.AppParams.GetOrGenerate(opWeightMsgDeleteData, &weightMsgDeleteData, nil,
		func(_ *rand.Rand) {
			weightMsgDeleteData = defaultWeightMsgDeleteData
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgDeleteData,
		storagesimulation.SimulateMsgDeleteData(am.authKeeper, am.bankKeeper, am.keeper, simState.TxConfig),
	))

	return operations
}

// ProposalMsgs returns msgs used for governance proposals for simulations.
func (am AppModule) ProposalMsgs(simState module.SimulationState) []simtypes.WeightedProposalMsg {
	return []simtypes.WeightedProposalMsg{}
}
