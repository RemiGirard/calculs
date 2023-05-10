import Title from '../components/Title';
import dictionaryTyped from '../dictionary.json'
import Button from '../components/buttons/Button';
import IntInput from '../components/inputs/IntInput';
import SelectInput from '../components/inputs/SelectInput';
import { Case, Switch } from '../utils/Switch';

const dictionary:any = dictionaryTyped;

const LimitChoice = ({ title, exercices, setExercices, defaultExerciceUpdated, columns, setGameStarted }: any) => {

  const maxGroups = 4;

  const setOneLimit = (propKeys : any, value: any) => {
    let newLimits = [...exercices];
    let currentObj = newLimits;
    for (let i = 0; i < propKeys.length - 1; i++) {
      currentObj = currentObj[propKeys[i]];
    }
    
    currentObj[propKeys[propKeys.length - 1]] = value;
    setExercices(newLimits);
  }

  const removeLevel = (index:any) => {
    let newLimits = structuredClone(exercices)
    newLimits.splice(index, 1)
    setExercices(newLimits)
  }
  const addLevel = () => {
    setExercices([...exercices, defaultExerciceUpdated])
  }

  const removeGroup = (index:any) => {
    let newLimits = structuredClone(exercices)
    let newGroups = structuredClone(exercices[0].groups)
    newGroups.splice(index, 1)
    newLimits = newLimits.map((limit:any) => {
      return {
        ...limit,
        groups: structuredClone(newGroups),
      }
    })
    setExercices(newLimits)
  }

  const isMaxGroup = exercices[0].groups.length >= maxGroups;

  const addGroup = () => {
      let newExercices = structuredClone(exercices)

      newExercices = newExercices.map((exercice:any) => {
        const newGroup = structuredClone(exercice.groups[exercice.groups.length-1])
        return {
          ...exercice,
          groups: [
            ...exercice.groups,
            newGroup
            ,
          ],
        }
      })
      setExercices(newExercices)
  }


  return (<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000303', color: '#55cc55', height: '100%'}}>
    <Title style={{marginBottom: '50px', color: 'grey'}}>{title}</Title>
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <table style={{marginBottom: '50px'}}>
        <thead>
          <tr>{
            columns.map((column:any, columnIndex:any) => {
              const columnName: 'calcType'|'calcNumber'|'difficulty'|'questionDuration'|'answerDuration'|'gap' = column.name;
              return <td key={columnIndex}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  {column.name === 'groups'
                  ? <div style={{width: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div>groupes</div>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                      {
                        exercices[0].groups.map((group:any, groupIndex:any) => {
                          return <div key={groupIndex} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div>groupe {groupIndex+1} </div>
                            <div style={{width: '15px', height: '15px', margin: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                  : dictionary.columns[columnName] ?? column.name
                  }
                </div>
                </td>
            })
          }</tr>
        </thead>
        <tbody>
          {exercices.map((element:any, index:any) => {
            return (<tr key={index}>
              {
                columns.map((column:any, columnIndex:any) => {
                  return <td key={columnIndex}>
                    <Switch expression={column.field}>
                      <Case value={'int'}>
                        <IntInput
                          value={element[column.name]}
                          onChangeValue={(value:any) => setOneLimit([index, column.name], value)}
                        />
                      </Case>
                      <Case value={'groups'}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                        {
                          element['groups'].map((group:any, groupIndex:any) => {
                          return <div key={groupIndex} style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <div> min:</div>
                              <IntInput
                                value={group.min}
                                onChangeValue={(value:any) => setOneLimit([index, column.name, groupIndex, 'min'], value)}
                              />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <div>max:</div>
                              <IntInput
                                value={group.max}
                                onChangeValue={(value:any) => setOneLimit([index, column.name, groupIndex, 'max'], value)}
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
                            onChangeValue={(value:any) => setOneLimit([index, column.name, 'min'], value)}
                          />
                        <div>max:</div>
                        <IntInput
                          value={element[column.name].max}
                          onChangeValue={(value:any) => setOneLimit([index, column.name, 'max'], value)}
                        />
                        </div>
                      </Case>
                      <Case value={'time'}>
                        <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                          <IntInput
                            value={element[column.name]}
                            onChangeValue={(value:any) => setOneLimit([index, column.name], value)}
                          />
                          <div>secondes</div>
                          </div>
                      </Case>
                      <Case value={'number'}>
                        <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                          <IntInput
                            value={element[column.name]}
                            onChangeValue={(value:any) => setOneLimit([index, column.name], value)}
                          />
                          </div>
                      </Case>
                      <Case value={'select'}>
                        <SelectInput
                          value={element[column.name]}
                          onChangeValue={(value:any) => setOneLimit([index, column.name], value)}
                          choices={column.choices}
                          renderChoice={(choice:any, choiceIndex:any) => <option key={choiceIndex} value={choice}>{dictionary.fields[column.name][choice] ?? choice}</option>}
                        />
                      </Case>
                      <Case value={'calcType'}>
                        <SelectInput
                          value={element[column.name]}
                          onChangeValue={(value:any) => setOneLimit([index, column.name], value)}
                          choices={column.choices}
                          renderChoice={(choice:any, choiceIndex:any) => <option key={choiceIndex} value={choice}>{dictionary.fields[column.name][choice] ?? choice}</option>}
                        />
                        {element[column.name] === '+ x*10'
                          ? <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>min:</div>
                            <IntInput
                              value={element.calcSpeRange.min}
                              onChangeValue={(value:any) => setOneLimit([index, 'calcSpeRange', 'min'], value)}
                            />
                            <div>max:</div>
                            <IntInput
                              value={element.calcSpeRange.max}
                              onChangeValue={(value:any) => setOneLimit([index, 'calcSpeRange', 'max'], value)}
                            />
                          </div>
                          : null
                        }
                        {element[column.name] === '+ x'
                          ? <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>nombre:</div>
                            <IntInput
                              value={element.calcSpeNumber}
                              onChangeValue={(value:any) => setOneLimit([index, 'calcSpeNumber'], value)}
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
        <Button onClick={() => addGroup()} disable={isMaxGroup} style={{ width: '25%', height: '50px', background: '#106610', fontSize: '1.2em' }}>
          {dictionary.buttons.addGroup ?? 'addGroup'}
        </Button>
        <Button onClick={() => addLevel()} style={{ width: '25%', height: '50px', background: '#106610', fontSize: '1.2em' }}>
          {dictionary.buttons.addExercice ?? 'addExercice'}
        </Button>
        <Button onClick={() => setGameStarted()} style={{ width: '25%', height: '50px', background: '#051087', color: 'white', fontSize: '1.5em', textDecoration: 'none' }}>
          Démarrer
        </Button>
      </div>
    </div>
  </div>)
}

export default LimitChoice;