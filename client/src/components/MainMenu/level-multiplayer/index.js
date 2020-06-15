import React, { Component } from 'react';
import { GameContext } from 'engine/GameProvider';
import { DivLevelMultiplayer } from './style';
import Button from 'components/Button';
import Input from 'components/Input';

//import char01 from '../../../assets/sprites/char01-avatar.png';
//import char02 from '../../../assets/sprites/char02-avatar.png';

export default class LevelMultiplayer extends Component {
  state = {
    mainVisible: true,
    createHostVisible: false,
    joinHostVisible: false,
    amIHost: false,
    hostCode: '',
  };

  doCreateHost = () => {
    if (this.context.state.username !== null) {
      this.setState({
        mainVisible: false,
        createHostVisible: true,
        amIHost: true,
      });
      this.context.logic.createHost();
    } else {
      alert('Digite o nome de usuário antes.');
    }
  };

  doStartJoinHost = () => {
    if (this.context.state.username !== null) {
      this.setState({
        mainVisible: false,
        joinHostVisible: true,
      });
    } else {
      alert('Digite o nome de usuário antes.');
    }
  };

  doJoinHost = () => {
    if (this.context.state.hostCode !== null) {
      this.setState({
        mainVisible: false,
        createHostVisible: true,
        joinHostVisible: false,
        amIHost: false,
      });
      this.context.logic.joinHost(this.state.hostCode);
    } else {
      alert('Digite código da sala');
    }
  };

  setHostCode = (code) => {
    this.setState({
      hostCode: code,
    });
  };

  render() {
    const context = this.context;
    return (
      <DivLevelMultiplayer className="level-multiplayer">
        <div className={this.state.mainVisible ? 'main' : 'hide'}>
          <p>Nome de usuário</p>
          <br />
          <Input
            type="text"
            defaultValue={context.state.username}
            onChange={(e) => {
              context.logic.setUsername(e.target.value);
            }}
          />

          <ul className="menu">
            <li className="menu-new">
              <Button
                theme="blue"
                onClick={() => {
                  this.doCreateHost();
                }}
              >
                Criar Sala
              </Button>
            </li>
            <li className="menu-new">
              <Button
                theme="blue"
                onClick={() => {
                  this.doStartJoinHost();
                }}
              >
                Entrar em uma sala
              </Button>
            </li>
          </ul>
        </div>

        <div className={this.state.createHostVisible ? 'create-host' : 'hide'}>
          {context.state.hostCode !== '' ? (
            <>
              <p>Código da Sala:</p>

              <Input
                type="text"
                readOnly={true}
                defaultValue={context.state.hostCode}
                onChange={(e) => {
                  context.logic.setUsername(e.target.value);
                }}
              />

              <ul className="logged-users">
                <li>
                  <strong>Jogadores conectados:</strong>
                </li>
                {this.context.state.hostConnectedUsers.map((user, index) => {
                  return <li key={index}>- {user}</li>;
                })}
              </ul>

              <ul className="menu">
                <li className="menu-new">
                  {this.state.amIHost ? (
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

        <div className={this.state.joinHostVisible ? 'join-host' : 'hide'}>
          <p>Digite o código da Sala:</p>
          <Input
            type="text"
            defaultValue={this.state.hostCode}
            onChange={(e) => {
              this.setHostCode(e.target.value);
            }}
          />

          <ul className="menu">
            <li className="menu-new">
              <Button
                theme="blue"
                onClick={() => {
                  this.doJoinHost();
                }}
              >
                Entrar na sala
              </Button>
            </li>
          </ul>
        </div>
      </DivLevelMultiplayer>
    );
  }
}

LevelMultiplayer.contextType = GameContext;
