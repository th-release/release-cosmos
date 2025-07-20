import { Bip39, Random } from "@cosmjs/crypto";

export class BlockchainService {
  public createPrivateKey() {
		const bytes = Random.getBytes(32);

		return {
			privateKeyBytes: bytes,
			privateKeyString: Buffer.from(bytes).toString('hex')
		}
	}

	public createMnemonic() {
		const bytes = Random.getBytes(32)

		const mnemonic = Bip39.encode(bytes).toString();

		return {
			mnemonicBytes: bytes,
			mnemonicString: mnemonic
		}
	}
}