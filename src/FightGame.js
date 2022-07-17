import * as React from 'react';
// import './style.css';
import styles from './FightGame.module.scss'

export default function FightGame() {
  const FPS = 60;
  const Buffer = 30;
  const [currentFrame, setCurrentFrame] = React.useState(1);
  const [secondsElapsed, setSecondsElapsed] = React.useState(0);
  const [timerIsRunning, setTimerIsRunning] = React.useState(false);

  // Buffer
  const [inputBuffer, setInputBuffer] = React.useState([]);

  // Stance States
  const [isJumping, setIsJumping] = React.useState(false);
  const [isDoubleJumping, setIsDoubleJumping] = React.useState(false);

  const [isHighJumping, setIsHighJumping] = React.useState(false);

  const [isAttacking, setIsAttacking] = React.useState(false);
  const [isSpecialAttacking, setIsSpecialAttacking] = React.useState(false);
  const [isSuperAttacking, setIsSuperAttacking] = React.useState(false);

  // Moves
  const [movesExecuted, setMovesExecuted] = React.useState([])

  React.useEffect(() => {
    const runFpsEngine = setInterval(() => {
      // console.log(currentFrame);
      if (currentFrame === 60) {
        setSecondsElapsed(secondsElapsed + 1);
        setCurrentFrame(1);
      } else {
        setCurrentFrame((currentFrame) => currentFrame + 1);
      }
    }, 1000 / FPS);
    return () => clearInterval(runFpsEngine);
  }, [currentFrame]);

  const calcFrame = (currentFrame, moveFrames) => {
    moveFrames = moveFrames > 60 ? moveFrames - 60 : moveFrames;
    if (currentFrame + moveFrames > FPS) {
      return currentFrame + moveFrames - 60;
    } else {
      return currentFrame + moveFrames;
    }
  };

  const moveSet = {
    jump: { total: 41, prejump: 4, jump: 37 },
    highJump: { total: 55, highJump: 55 },
    slash: { total: 30, startup: 9, active: 2, recovery: 19 },
    jumpSlash: { total: 25, startup: 7, active: 4, recovery: 14 },
    //specials
    tandemTop: { total: 71, startup: 12, active: 14, recovery: 45 },
    lustShaker: { total: 39, startup: 17, active: 6, recovery: 16 },
    //supers
    septemVoices: { total: 52, startup: (4+5), active: 0, recovery: 43 }
  };

  const executeAction = (move) => {
    return new Promise((resolve, reject) => {
      // controller.signal.addEventListener("abort", () => {
      //   reject('rject');
      // });

      setTimeout(() => {
        resolve(calcFrame(currentFrame, move.total));
      }, (1000 / 60) * move.total);
    });
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
      setTimeout(() => {
        setInputBuffer([]);
      }, (1000 / 60) * Buffer);
    }
    switch (key) {
      case 'w':
        console.log(Math.abs(1657404000000 - Date.now()))
        console.log(currentFrame)
        // setInputBuffer([...inputBuffer, '8']);

        // // !isJumping
        // //   ? console.log(key, 'jump action started', currentFrame)
        // //   : console.log(key, 'high jump action started', currentFrame);
        // // let action;

        // if (inputBuffer[inputBuffer.length - 1] === "2") {
        //     setIsJumping(true);
        //     setIsHighJumping(true);
            
        //     console.log(key, 'high jump action started', currentFrame);
        //     setTimeout(() => {
        //         setIsJumping(false);
        //         setIsHighJumping(false);
        //         console.log(
        //           'High Jump action finished',
        //           calcFrame(currentFrame, moveSet.highJump.total)
        //         );
        //       }, (1000 / 60) * moveSet.highJump.total);
        // } else {

        //     if (isJumping && !isDoubleJumping && !isHighJumping) {
        //       setIsDoubleJumping(true);
    
        //       console.log(key, 'double jump action started', currentFrame);
        //       // action = executeAction(moveSet.doubleJump);
    
              
        //       setTimeout(() => {
        //         setIsJumping(false);
        //         setIsDoubleJumping(false);
        //         console.log(
        //           'double jump action finished',
        //           calcFrame(currentFrame, moveSet.jump.total)
        //         );
        //       }, (1000 / 60) * moveSet.jump.total);
        //       // action.then((frame) => {
        //       //   setIsJumping(false)
        //       //   setIsDoubleJumping(false);
        //       //   console.log('double jump action finished', frame);
        //       // });
        //     } else if (isDoubleJumping || isHighJumping) {
        //       break;
        //     } else {
        //       setIsJumping(true);
        //       console.log(key, 'jump action started', currentFrame);
        //       // action = executeAction(moveSet.jump);
        //       setTimeout(() => {
        //         setIsJumping(isDoubleJumping ? true : false);
        //         console.log(
        //           'jump action finished',
        //           calcFrame(currentFrame, moveSet.jump.total)
        //         );
        //       }, (1000 / 60) * moveSet.jump.total);
    
        //       // action.then((frame) => {
        //       //   setIsJumping(isDoubleJumping ? true : false);
        //       //   console.log('jump action finished', frame);
        //       // });
        //     }
        // }

        break;

      case 'p':
        // !isJumping && !isDoubleJumping
        //   ? console.log(key, 'slash action started', currentFrame)
        //   : console.log(key, 'jump slash action started', currentFrame);
        // let action;

        if (isAttacking) {
          break;
        } else if (!isJumping && !isDoubleJumping) {
          setIsAttacking(true);

          if (inputBuffer[0] && inputBuffer.join('') === '214') {
            setIsSpecialAttacking(true)
            console.log(key, 'Lust Shaker action started', currentFrame);
            setMovesExecuted([{name: "Lust Shaker", input : "🡻🡿🡸S"}, ...movesExecuted ])
            setTimeout(() => {
              setIsAttacking(false);
              setIsSpecialAttacking(false)
              console.log(
                'Lust Shaker action finished',
                calcFrame(currentFrame, moveSet.lustShaker.total)
              );
            }, (1000 / 60) * moveSet.lustShaker.total);

          } else if (inputBuffer[0] && inputBuffer.join('') === '236') {
            setIsSpecialAttacking(true)
            console.log(key, 'Tandem Top action started', currentFrame);
            setMovesExecuted([{name: "Tandem Top", input : "🡻🡾🡺S"}, ...movesExecuted ])
            setTimeout(() => {
              setIsAttacking(false);
              setIsSpecialAttacking(false)
              console.log(
                'Tandem Top action finished',
                calcFrame(currentFrame, moveSet.tandemTop.total)
              );
            }, (1000 / 60) * moveSet.tandemTop.total);

          } else if (inputBuffer[0] && inputBuffer.join('') === '236236') {
            setIsSuperAttacking(true)

            console.log(key, 'Septem Voices action started', currentFrame);

            setMovesExecuted([{name: "Septem Voices", input : "🡻🡾🡺🡻🡾🡺S"}, ...movesExecuted ])

            setTimeout(() => {
              setIsAttacking(false);
              setIsSuperAttacking(false)
              console.log(
                'Septem Voices action finished',
                calcFrame(currentFrame, moveSet.septemVoices.total)
              );
            }, (1000 / 60) * moveSet.septemVoices.total);

          } else {
            console.log(key, 'slash action started', currentFrame);
            setMovesExecuted([{name: "Far Slash", input : "S"}, ...movesExecuted ])
            setTimeout(() => {
              setIsAttacking(false);
              console.log(
                'slash action finished',
                calcFrame(currentFrame, moveSet.slash.total)
              );
            }, (1000 / 60) * moveSet.slash.total);
          }

        } else if (isJumping) {
          setIsAttacking(true);
          console.log(key, 'jump slash action started', currentFrame);
          setTimeout(() => {
            setIsAttacking(false);
            console.log(
              'jump slash action finished',
              calcFrame(currentFrame, moveSet.jumpSlash.total)
            );
          }, (1000 / 60) * moveSet.jumpSlash.total);
        }

        break;
      case 'd':
        if (inputBuffer[inputBuffer.length - 1] === '2') {
          setInputBuffer([...inputBuffer, '3']);
        } else {
          setInputBuffer([...inputBuffer, '6']);
        }
        break;

      case 's':
        if (inputBuffer[inputBuffer.length - 1] === '4') {
          setInputBuffer([...inputBuffer, '1']);
        } else if (inputBuffer[inputBuffer.length - 1] === '6') {
          setInputBuffer([...inputBuffer, '3']);
        } else {
          setInputBuffer([...inputBuffer, '2']);
        }
        break;

      case 'a':
        if (inputBuffer[inputBuffer.length - 1] === '2') {
          setInputBuffer([...inputBuffer, '1']);
        } else {
          setInputBuffer([...inputBuffer, '4']);
        }
        break;
        default:
            console.log(key)
    }

    // e.key === 'a' ? console.log(e.key, 'key pressed', currentFrame) : null;
  };

  const handleKeyUp = (e) => {
    const key = e.key;
    switch (key) {
      case 'w':
        // setInputBuffer([...inputBuffer, '8'])
        break;

      case 'o':
        break;
      case 'd':
        if (inputBuffer[inputBuffer.length - 1] === '3') {
          setInputBuffer([...inputBuffer, '2']);
        }
        break;
      case 's':
        if (inputBuffer[inputBuffer.length - 1] === '1') {
          setInputBuffer([...inputBuffer, '4']);
        } else if (inputBuffer[inputBuffer.length - 1] === '3') {
          setInputBuffer([...inputBuffer, '6']);
        }
        break;
      case 'a':
        if (inputBuffer[inputBuffer.length - 1] === '1') {
          setInputBuffer([...inputBuffer, '2']);
        }
        break;
        default:
            console.log(key)
    }
  };

  const getJumpingStatus = () => {
    let status;
    if (isHighJumping) {
        status = "HIGH JUMP";
    } else if (isDoubleJumping) {
        status = "DOUBLE JUMP";
    } else if (isJumping && !isHighJumping && !isDoubleJumping) {
        status = "JUMP";
    } else {
        status = "IDLE"
    }
    
    return status
  }

  return (
    <div
      // autofocus={true}
      tabIndex={0}
      // onKeyDown={(e) => handleKeyDown(e)}
      className={styles.gameContainer}
    >
        <div className={styles.movesExecuted}>
            {movesExecuted.map(m => 
            <div className={styles.move}>
                <div>{m.name}</div>
                <div>{m.input}</div>
            </div>
            )}
        </div>

        <div className={styles.gameControl}>
            <div className={styles.frameCounter}>{currentFrame}</div>

            <input
                autoFocus
                onKeyDown={(e) => handleKeyDown(e)}
                onKeyUp={(e) => handleKeyUp(e)}
            ></input>
            <div className={`${styles.jumpStatus} ${!isJumping && !isDoubleJumping && isAttacking ? styles.inactive : ""}`}>
                {/* {isJumping || isDoubleJumping
                ? isDoubleJumping
                    ? 'DOUBLE JUMP'
                    : 'JUMP'
                : 'IDLE'}  */}
                {getJumpingStatus()}
            </div>
            {/* <div>{isDoubleJumping ? 'double Jump' : 'Idle'}</div> */}
            <div className={`${styles.attackStatus} ${!isAttacking ? styles.inactive : ""}`}>ATTACK</div>
            <div className={`${styles.attackStatus} ${!isSpecialAttacking ? styles.inactive : ""}`}>SPECIAL</div>
            <div>{inputBuffer.join(' ')}</div>
        </div>

      
    </div>
  );
}
