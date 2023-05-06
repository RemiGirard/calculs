import React from 'react';
import lodash from 'lodash';

import Title from './Title';
import dictionary from '../dictionary.json'
import Button from './buttons/Button';
import IntInput from './inputs/IntInput';
import SelectInput from './inputs/SelectInput';
import { Case, Switch } from './utils/Switch';

const LimitChoice = ({ title, exercices, setExercices, defaultExerciceUpdated, columns, setGameStarted }) => {

  const setOneLimit = (propKeys, value) => {
    let newLimits = [...exercices];
    let currentObj = newLimits;
    for (let i = 0; i < propKeys.length - 1; i++) {
      currentObj = currentObj[propKeys[i]];
    }
    
    currentObj[propKeys[propKeys.length - 1]] = value;
    setExercices(newLimits);
  }

  const removeLevel = (index) => {
    let newLimits = lodash.clone(exercices)
    newLimits.splice(index, 1)
    setExercices(newLimits)
  }
  const addLevel = () => {
    setExercices([...exercices, defaultExerciceUpdated])
  }

  const removeGroup = (index) => {
    let newLimits = lodash.cloneDeep(exercices)
    let newGroups = exercices[0].groups
    newGroups.splice(index, 1)
    newLimits = newLimits.map((limit) => {
      return {
        ...limit,
        groups: newGroups,
      }
    })
    setExercices(newLimits)
  }

  const addGroup = () => {
      let newLimits = lodash.cloneDeep(exercices)
      

      newLimits = newLimits.map((limit) => {
        const newGroup = lodash.cloneDeep(limit.groups[limit.groups.length-1])
        return {
          ...limit,
          groups: [
            ...limit.groups,
            newGroup
            ,
          ],
        }
      })
      setExercices(newLimits)
  }


  return (<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000303', color: '#55cc55', height: '100%'}}>
    <Title style={{marginBottom: '50px', color: 'grey'}}>{title}</Title>
    <div style={{maxWidth: '1500px',display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <table style={{marginBottom: '50px'}}>
        <thead>
          <tr>{
            columns.map((column, columnIndex) => {
              return <td key={columnIndex}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  {column.name === 'groups'
                  ? <div style={{width: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div>groupes</div>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'line', justifyContent: 'space-around'}}>
                      {
                        exercices[0].groups.map((group, groupIndex) => {
                          return <div key={groupIndex} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div>groupe {groupIndex+1} </div>
                            <div style={{with: '15px', height: '15px', margin: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            {exercices[0].groups.length > 1
                              ? <div onClick={()=> removeGroup(groupIndex)} style={{width: '15px', height: '15px', backgroundColor: '#bbb', borderRadius: '5px', color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>x</div>
                              : null
                            }
                            </div>
                            </div>
                        })
                      }
                    </div>
                  </div>
                  : dictionary.columns[column.name] ?? column.name
                  }
                </div>
                </td>
            })
          }</tr>
        </thead>
        <tbody>
          {exercices.map((element, index) => {
            return (<tr key={index}>
              {
                columns.map((column, columnIndex) => {
                  return <td key={columnIndex}>
                    <Switch expression={column.field}>
                      <Case value={'int'}>
                        <IntInput
                          value={element[column.name]}
                          onChangeValue={(value) => setOneLimit([index, column.name], value)}
                        />
                      </Case>
                      <Case value={'groups'}>
                        <div style={{display: 'flex', flexDirection: 'line'}}>
                        {
                          element['groups'].map((group, groupIndex) => {
                          return <div key={groupIndex} style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'line', alignItems: 'center'}}>
                              <div> min:</div>
                              <IntInput
                                value={group.min}
                                onChangeValue={(value) => setOneLimit([index, column.name, groupIndex, 'min'], value)}
                              />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'line', alignItems: 'center'}}>
                              <div>max:</div>
                              <IntInput
                                value={group.max}
                                onChangeValue={(value) => setOneLimit([index, column.name, groupIndex, 'max'], value)}
                              />
                            </div>
                          </div>
                          })
                        }
                        </div>
                        
                      </Case>
                      <Case value={'range'}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <div>min:</div>
                          <IntInput
                            value={element[column.name].min}
                            onChangeValue={(value) => setOneLimit([index, column.name, 'min'], value)}
                          />
                        <div>max:</div>
                        <IntInput
                          value={element[column.name].max}
                          onChangeValue={(value) => setOneLimit([index, column.name, 'max'], value)}
                        />
                        </div>
                      </Case>
                      <Case value={'time'}>
                        <div style={{display:'flex', flexDirection: 'line', alignItems: 'center', justifyContent: 'space-around'}}>
                          <IntInput
                            value={element[column.name]}
                            onChangeValue={(value) => setOneLimit([index, column.name], value)}
                          />
                          <div>secondes</div>
                          </div>
                      </Case>
                      <Case value={'number'}>
                        <div style={{display:'flex', flexDirection: 'line', alignItems: 'center', justifyContent: 'space-around'}}>
                          <IntInput
                            value={element[column.name]}
                            onChangeValue={(value) => setOneLimit([index, column.name], value)}
                          />
                          </div>
                      </Case>
                      <Case value={'select'}>
                        <SelectInput
                          value={element[column.name]}
                          onChangeValue={(value) => setOneLimit([index, column.name], value)}
                          choices={column.choices}
                          renderChoice={(choice, choiceIndex) => <option key={choiceIndex} value={choice}>{dictionary.fields[column.name][choice] ?? choice}</option>}
                        />
                      </Case>
                      <Case value={'calcType'}>
                        <SelectInput
                          value={element[column.name]}
                          onChangeValue={(value) => setOneLimit([index, column.name], value)}
                          choices={column.choices}
                          renderChoice={(choice, choiceIndex) => <option key={choiceIndex} value={choice}>{dictionary.fields[column.name][choice] ?? choice}</option>}
                        />
                        {element[column.name] === '+ x*10'
                          ? <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>min:</div>
                            <IntInput
                              value={element.calcSpeRange.min}
                              onChangeValue={(value) => setOneLimit([index, 'calcSpeRange', 'min'], value)}
                            />
                            <div>max:</div>
                            <IntInput
                              value={element.calcSpeRange.max}
                              onChangeValue={(value) => setOneLimit([index, 'calcSpeRange', 'max'], value)}
                            />
                          </div>
                          : null
                        }
                        {element[column.name] === '+ x'
                          ? <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>nombre:</div>
                            <IntInput
                              value={element.calcSpeNumber}
                              onChangeValue={(value) => setOneLimit([index, 'calcSpeNumber'], value)}
                            />
                          </div>
                          : null
                        }
                      </Case>
                    </Switch>
                  </td>
                })
              }
              <td>{exercices.length > 1 ? <Button onClick={() => removeLevel(index)} style={{ color: 'white', background: '#bb1515', width: '30px', height: '30px' }}>x  </Button>:<div style={{width: '30px', height: '30px'}}></div>}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
        <Button onClick={() => addGroup()} style={{ width: '25%', height: '50px', background: '#106610', fontSize: '1.2em'  }}>
          {dictionary.buttons.addGroup ?? 'addGroup'}
        </Button>
        <Button onClick={() => addLevel()} style={{ width: '25%', height: '50px', background: '#106610', fontSize: '1.2em' }}>
          {dictionary.buttons.addExercice ?? 'addExercice'}
        </Button>
        <Button onClick={() => setGameStarted()} style={{ width: '25%', height: '50px', background: '#051087', color: 'white', fontSize: '1.5em', textDecoration: 'none'}}>
          Démarrer1
        </Button>
        {/* <Link
          to={`/start`}
          style={{ width: '25%', display: 'flex', justifyContent: 'center', padding: '15px', background: '#051087', color: 'white', fontSize: '1.5em', textDecoration: 'none' }}
          >
            {dictionary.buttons.start ?? 'start'}
          </Link> */}
      </div>
    </div>
  </div>)
}

export default LimitChoice;