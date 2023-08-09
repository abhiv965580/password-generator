import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";
import { Button } from 'baseui/button';
import { Input } from "baseui/input";
import { Accordion, Panel } from "baseui/accordion";
import { Slider } from "baseui/slider";
import {
  Checkbox,
  LABEL_PLACEMENT
} from "baseui/checkbox";

function App() {
  const [value, setValue] = React.useState("");
  const [sliderValue, setSliderValue] = React.useState([20]);
  const [checked, setChecked] = React.useState(true);

  return (
    <div className="App">
      <Card
      overrides={{Root: {style: {width: '328px'}}}}
      title="Password Generator"
    >
      <StyledBody>
        This password generator will create a random password for you according to the options set.
      </StyledBody>
      <StyledAction>
        <Button overrides={{BaseButton: {style: {width: '100%'}}}}>
          Button Label
        </Button>
      </StyledAction>
      <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Enter a value"
      clearOnEscape
    />
    <Accordion
      onChange={({ expanded }) => console.log(expanded)}
      accordion
    >
      <Panel title="Options">
      <Slider
      value={sliderValue}
      onChange={({ value }) => value && setSliderValue(value)}
      onFinalChange={({ value }) => console.log(value)}
    />
    <Checkbox
      checked={checked}
      onChange={e => setChecked(e.target.checked)}
      labelPlacement={LABEL_PLACEMENT.right}
      overrides={{
        Checkmark: {
          style: ({ $theme }) => ({
            outline: `${$theme.colors.warning600} solid`,
            backgroundColor: $theme.colors.warning600,
            borderRadius: '3px'
          })
        }
      }}
    >
      Option 1
    </Checkbox><Checkbox
      checked={checked}
      onChange={e => setChecked(e.target.checked)}
      labelPlacement={LABEL_PLACEMENT.right}
      overrides={{
        Checkmark: {
          style: ({ $theme }) => ({
            outline: `${$theme.colors.warning600} solid`,
            backgroundColor: $theme.colors.warning600,
            borderRadius: '3px'
          })
        }
      }}
    >
      Option 2
    </Checkbox><Checkbox
      checked={checked}
      onChange={e => setChecked(e.target.checked)}
      labelPlacement={LABEL_PLACEMENT.right}
      overrides={{
        Checkmark: {
          style: ({ $theme }) => ({
            outline: `${$theme.colors.warning600} solid`,
            backgroundColor: $theme.colors.warning600,
            borderRadius: '3px'
          })
        }
      }}
    >
      Option 3
    </Checkbox>
      </Panel>
    </Accordion>
    
    </Card>
    </div>
  );
}

export default App;
