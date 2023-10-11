import React, {FC, useEffect, useState} from "react";
import {Button} from "@mui/material";
import {useAppSelector} from "../../../hooks/redux";
import {PhantomProvider} from "../../../models/IPhantomProvider";
import {usersApi} from "../../../api/usersApi";
import {clusterApiUrl, Connection, GetProgramAccountsFilter} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";
import RefreshIcon from '@mui/icons-material/Refresh';

const SidebarWallet: FC = () => {
  const {authUser} = useAppSelector(state => state.authReducer)
  const {data: currentUser} = usersApi.useFetchUserByIdQuery(authUser.id);
  const [updateUser] = usersApi.useUpdateUserMutation();

  const [provider, setProvider] = useState<PhantomProvider | undefined>(undefined);
  const [walletKey, setWalletKey] = useState<PhantomProvider | undefined>(undefined);
  const [connected, setConnected] = useState<boolean>(false)
  const [balance, setBalance] = useState<number>(0)

  const getProvider = (): PhantomProvider | undefined => {
    if ("solana" in window) {
      // @ts-ignore
      const provider = window.solana as any;
      if (provider.isPhantom) return provider as PhantomProvider;
    }
  };

  const connectWallet = async () => {
    // @ts-ignore
    const {solana} = window;

    if (solana) {
      try {
        const response = await solana.connect();
        setWalletKey(response.publicKey.toString());
        updateUser({
          public_key: response.publicKey.toString(),
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          avatar: currentUser.avatar,
          gender: currentUser.gender
        })
        await getBalance(response.publicKey);
        setConnected(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const disconnectWallet = async () => {
    // @ts-ignore
    const {solana} = window;

    if (walletKey && solana) {
      await (solana as PhantomProvider).disconnect();
      setWalletKey(undefined);
    }
  };

  const getBalance = async (wallet) => {
    try {
      const solana = new Connection(clusterApiUrl("testnet"), "confirmed");
      const filters: GetProgramAccountsFilter[] = [
        {
          dataSize: 165
        },
        {
          memcmp: {
            offset: 32,
            bytes: wallet
          }
        }
      ];

      const tokenAccounts = await solana.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {filters})
      tokenAccounts.forEach((account) => {
        const parsedAccountInfo = account.account.data;
        const tokenBalance: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
        setBalance(tokenBalance);
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const provider = getProvider();

    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);

  return (
    <>
      {
        !connected &&
          <Button variant="contained" onClick={connectWallet}>Connect Wallet</Button>
      }

      {
        connected &&
          <div className="wallet-balance-area">
              BALANCE: {balance} AIDS
              <RefreshIcon sx={{width: '20px', height: '20px'}} onClick={connectWallet}/>
          </div>
      }
    </>
  );
}

export default SidebarWallet;