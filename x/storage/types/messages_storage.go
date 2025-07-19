package types

func NewMsgCreateStorage(
	owner string,
	denom string,
	data string,

) *MsgCreateStorage {
	return &MsgCreateStorage{
		Owner: owner,
		Denom: denom,
		Data:  data,
	}
}

func NewMsgUpdateStorage(
	owner string,
	denom string,
	data string,

) *MsgUpdateStorage {
	return &MsgUpdateStorage{
		Owner: owner,
		Denom: denom,
		Data:  data,
	}
}

func NewMsgDeleteStorage(
	owner string,
	denom string,

) *MsgDeleteStorage {
	return &MsgDeleteStorage{
		Owner: owner,
		Denom: denom,
	}
}
