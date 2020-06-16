import React, { useContext, useState } from 'react';

import { GameContext } from 'engine/GameProvider';

import Button from 'components/Button';
import Input from 'components/Input';

import { DivLevelMultiplayer } from './style';

import { ContextType } from 'types';

const LevelMultiplayer: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const { state, logic } = context;
  const { username, hostConnectedUsers } = state;
  const { createHost, joinHost, setUsername } = logic;

  const [mainVisible, setMainVisible] = useState<boolean>(true);
  const [createHostVisible, setCreateHostVisible] = useState<boolean>(false);
  const [joinHostVisible, setJoinHostVisible] = useState<boolean>(false);
  const [amIHost, setAmIHost] = useState<boolean>(false);
  const [hostCode, setHostCode] = useState<string>('');

  const doCreateHost = () => {
    if (!username) return alert('Digite o nome de usuário antes.');

    setMainVisible(false);
    setCreateHostVisible(true);
    setAmIHost(true);

    createHost();
  };

  const doStartJoinHost = () => {
    if (!username) return alert('Digite o nome de usuário antes.');

    setMainVisible(false);
    setJoinHostVisible(true);
  };

  const doJoinHost = () => {
    if (!hostCode) return alert('Digite código da sala.');

    setMainVisible(false);
    setCreateHostVisible(true);
    setJoinHostVisible(false);
    setAmIHost(false);

    joinHost(hostCode);
  };

  return (
    <DivLevelMultiplayer className="level-multiplayer">
      <div className={mainVisible ? 'main' : 'hide'}>
        <p>Nome de usuário</p>
        <br />
        <Input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <ul className="menu">
          <li className="menu-new">
            <Button
              theme="blue"
              onClick={() => {
                doCreateHost();
              }}
            >
              Criar Sala
            </Button>
          </li>
          <li className="menu-new">
            <Button
              theme="blue"
              onClick={() => {
                doStartJoinHost();
              }}
            >
              Entrar em uma sala
            </Button>
          </li>
        </ul>
      </div>

      <div className={createHostVisible ? 'create-host' : 'hide'}>
        {state.hostCode !== '' ? (
          <>
            <p>Código da Sala:</p>

            <Input
              type="text"
              readOnly={true}
              value={state.hostCode}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <ul className="logged-users">
              <li>
                <strong>Jogadores conectados:</strong>
              </li>
              {hostConnectedUsers.map((user: string, index: number) => {
                return <li key={index}>- {user}</li>;
              })}
            </ul>

            <ul className="menu">
              <li className="menu-new">
                {amIHost ? (
                  <Button
                    theme="blue"
                    onClick={() => {
                      context.logic.startMultiplayerGame();
                    }}
                  >
                    Iniciar Jogo
                  </Button>
                ) : (
                  <p>Aguardando o dono da sala iniciar o jogo</p>
                )}
              </li>
            </ul>
          </>
        ) : (
          <p>Conectando, por favor, aguarde.</p>
        )}
      </div>

      <div className={joinHostVisible ? 'join-host' : 'hide'}>
        <p>Digite o código da Sala:</p>
        <Input
          type="text"
          defaultValue={hostCode}
          onChange={(e) => {
            setHostCode(e.target.value);
          }}
        />

        <ul className="menu">
          <li className="menu-new">
            <Button
              theme="blue"
              onClick={() => {
                doJoinHost();
              }}
            >
              Entrar na sala
            </Button>
          </li>
        </ul>
      </div>
    </DivLevelMultiplayer>
  );
};

export default LevelMultiplayer;
