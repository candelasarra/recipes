import React, { useState, useEffect } from 'react';
import RecipeItem from './RecipeItem';
import { itemsRef } from '../../firebase';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const RecipesList = ({ items, recipeKeys, signedin }) => {
  const [state, setState] = useState([]);
  const [filtered, setFiltered] = useState(items);
  const [switchFiltered, setSwitchFiltered] = useState([]);
  const [switches, setSwitches] = useState({
    cake: false,
    water: false
  });
  const [searchValue, setSearchValue] = useState('');
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(true);
    if (opened === false) {
      console.log('inside first use effect i am scrolling');
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
    }
  }, [opened]);

  useEffect(() => {
    setFiltered(items);
  }, [items]);
  useEffect(() => {
    console.log(opened);
    let newItems = [];
    const switchArray = Object.values(switches);
    if (switchArray.find(item => item === true)) {
      const currentItems = [...items];
      const switchesCopy = JSON.parse(JSON.stringify(switches));
      const filteredValues = [];
      Object.keys(switchesCopy).forEach(key => {
        if (!switchesCopy[key]) delete switchesCopy[key];
      });
      for (let key in switchesCopy) {
        filteredValues.push(key);
      }
      let itemTitle;
      let itemIngredients;
      let switchValue;
      for (let i = 0; i <= filteredValues.length - 1; i++) {
        for (let j = 0; j <= currentItems.length - 1; j++) {
          itemTitle = currentItems[j].title.toLowerCase();
          itemIngredients = currentItems[j].ingredients.toLowerCase();
          switchValue = filteredValues[i].toLowerCase();
          if (
            itemTitle.includes(switchValue) ||
            itemIngredients.includes(switchValue)
          )
            newItems.push(currentItems[j]);
        }
      }
      newItems.length
        ? setSwitchFiltered(newItems)
        : alert('no items matched that filter');
    }
    if (newItems.length && searchValue) {
      const searchedValues = newItems.filter(
        item =>
          item.title
            .toLowerCase()
            .includes(searchValue.toString().toLowerCase()) ||
          item.ingredients
            .toLowerCase()
            .includes(searchValue.toString().toLowerCase())
      );
      setSwitchFiltered(searchedValues);
    } else if (!newItems.length && searchValue) {
      const searchedValues = items.filter(
        item =>
          item.title
            .toLowerCase()
            .includes(searchValue.toString().toLowerCase()) ||
          item.ingredients
            .toLowerCase()
            .includes(searchValue.toString().toLowerCase())
      );
      setSwitchFiltered(searchedValues);
    } else if (!newItems.length && !searchValue) {
      setSwitchFiltered([]);
    }
  }, [switches, items, searchValue]);

  const handleChange = e => {
    setSearchValue(e.target.value);
  };
  const handleChangeSwitch = name => event => {
    setSwitches({ ...switches, [name]: event.target.checked });
  };

  const deleteRecipes = () => {
    const dataKeys = Object.keys(recipeKeys);
    const stateCopy = JSON.parse(JSON.stringify(state));
    Object.keys(stateCopy).forEach(key => {
      if (!stateCopy[key]) delete stateCopy[key];
    });
    const keysToBeDeleted = [];
    for (let key in stateCopy) {
      keysToBeDeleted.push(dataKeys[key]);
    }
    keysToBeDeleted.forEach(key => {
      itemsRef
        .ref('items')
        .child(key)
        .remove();
    });
    setState([]);
  };

  const checkboxOnChange = index => e => {
    setState({ ...state, [index]: e.target.checked });
  };
  const toBeRendered =
    switchFiltered.length || searchValue.length ? switchFiltered : filtered;

  const renderedList = toBeRendered.map((item, index) => {
    const deleteRecipe = () => {
      const keys = Object.keys(recipeKeys);
      const key = keys[index];
      itemsRef
        .ref('items')
        .child(key)
        .remove();
    };

    return (
      <RecipeItem
        key={item.id}
        recipe={item}
        deleteRecipe={deleteRecipe}
        index={index}
        state={{ state }[index]}
        checkboxOnChange={checkboxOnChange}
        signedin={signedin}
      />
    );
  });
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: '1vw',
          marginBottom: '2vw'
        }}
      >
        {signedin ? (
          <div>
            <Button
              size="small"
              style={{
                padding: '0.5vw',
                backgroundColor: '#51e1e2a1',
                borderRadius: '7px',
                boxShadow: '0 5px 30px #ff7c7c, 0 0 0 10px #ffffffeb',
                margin: '10px',
                color: '#892be3'
              }}
              onClick={() => deleteRecipes()}
              disabled={!renderedList.length}
            >
              DELETE
            </Button>
          </div>
        ) : (
          <div style={{ width: 200, height: 200 }} />
        )}
        <div
          style={{
            padding: '0.5vw',
            backgroundColor: '#ff7575',
            borderRadius: '7px',
            boxShadow: '0 5px 30px #ff7c7c, 0 0 0 10px #ffffffeb',
            width: '35%',
            margin: '10px'
          }}
        >
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            style={{
              backgroundColor: 'transparent',
              margin: '0',
              border: '0',
              padding: '0',
              color: 'white',
              outline: 'none',
              font: 'italic 145% "Fira Sans", serif',
              width: '100%'
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h3
            style={{
              textAlign: 'center',
              font: 'italic 145% "Fira Sans", serif',
              padding: '0.3vw',
              borderRadius: '7px',
              boxShadow: '0 5px 30px #ff7c7c, 0 0 0 10px #ffffffeb',
              margin: '10px',
              width: '50%',
              backgroundColor: '#51e1e2a1',
              color: '#892be3'
            }}
          >
            filter
          </h3>
          <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={switches.cake}
                  onChange={handleChangeSwitch('cake')}
                  value="cake"
                />
              }
              label="cake"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={switches.water}
                  onChange={handleChangeSwitch('water')}
                  value="water"
                />
              }
              label="water"
            />
          </FormGroup>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 350px))',
            gridGap: '25px',
            width: '80%',
            gridAutoFlow: 'dense',
            justifyContent: 'center'
          }}
        >
          {renderedList.reverse()}
        </div>
      </div>
    </div>
  );
};

export default RecipesList;
