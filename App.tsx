import * as React from 'react';
import Relation from './Components/Relationship';
import { Typography } from '@mui/material';

import './style.css';

export default function App() {
  const [persons, setPersons] = React.useState<Array<string>>([
    'mukesh',
    'santhosh',
    'sathish',
    'geetha',
    'kishore',
    'adhitya',
  ]);
  const [results, setResults] = React.useState<Array<Array<String>>>([]);

  const [relation, setRelation] = React.useState<Array<string>>(['Friend']);
  const [relationShipr, setRelationShip] = React.useState<Array<object>>([]);
  const searchRelation = (e: {
    firstPerson: any;
    secondPerson: any;
    relationShip: any;
  }) => {
    let filteredName = relationShipr.filter(
      (el: { firstPerson: any; secondPerson: any; relationShip: any }) => {
        return (
          el.firstPerson == e.firstPerson && el.relationShip == e.relationShip
        );
      }
    );

    let sol = [];
    filteredName.forEach(
      (element: { firstPerson: any; secondPerson: any; relationShip: any }) => {
        let searchingName = element.secondPerson;
        let arr = [element.firstPerson];
        let data;
        while (searchingName != e.secondPerson && searchingName != undefined) {
          data = userExists({
            firstPerson: searchingName,
          });
          searchingName = data?.secondPerson;
          if (searchingName != undefined) arr.push(data?.firstPerson);
        }

        if (arr.length > 0) {
          arr.push(e.secondPerson);
          sol.push(arr);
        }
      }
    );
    setResults(sol);
    console.log(sol, 'sol');
  };
  function userExist({ searchingName, relationShip }) {
    return relationShipr.filter(
      (el: { firstPerson: any; secondPerson: any; relationShip: any }) => {
        return (
          (el.firstPerson === searchingName ||
            el.secondPerson === searchingName) &&
          el.relationShip === relationShip
        );
      }
    );
  }
  const handleRelation = (e: {
    firstPerson: any;
    secondPerson: any;
    relationShip: any;
  }) => {
    if (!userExists(e)) {
      setRelationShip([...relationShipr, e]);
      console.log([...relationShipr, e]);
    }
  };
  function userExists({ firstPerson }) {
    let ans = relationShipr.find((el: { firstPerson: any }) => {
      if (el.firstPerson === firstPerson) {
        return el;
      }
    });
    return ans;
  }

  const arrtoString = (e: any) => {
    let ans = '';
    e.forEach((el: any) => {
      ans = ans + ' ' + el + ' > ';
    });
    return ans.slice(0, ans.length - 2);
  };
  return (
    <div>
      <Relation
        persons={[...persons]}
        relation={[...relation]}
        handlerelation={handleRelation}
        type={'Add Relationship'}
      />
      <Relation
        persons={[...persons]}
        relation={[...relation]}
        handlerelation={searchRelation}
        type={'search Relationship'}
      />

      <div>
        {results.map((e: any, i: any) => (
          <div key={i} className="dataste">
            {
              <Typography variant="h5" component="h5">
                {arrtoString(e)}
              </Typography>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
