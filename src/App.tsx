import React, { useEffect } from "react";
import "./App.css";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button, KIND, SHAPE } from "baseui/button";
import { Input } from "baseui/input";
import { Accordion, Panel } from "baseui/accordion";
import { Slider } from "baseui/slider";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";
import { useStyletron } from "baseui";
import copy from "copy-to-clipboard";

function App() {
  const [checkedLowercase, setCheckedLowerCase] = React.useState(true);
  const [checkedUppercase, setCheckedUppercase] = React.useState(true);
  const [checkedNumbers, setCheckedNumbers] = React.useState(true);
  const [checkedSpecial, setCheckedSpecial] = React.useState(true);
  const [length, setLength] = React.useState(10);
  const [copied, setCopied] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [useCss, theme] = useStyletron();

  const createPassword = (characters: string, passwordLength: number) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(charIndex);
    }
    return result;
  };

  const copyToClipboard = () => {
    copy(password);
    setCopied(true);
  };

  const setNewPassword = (p?: any) => {
    let charList = "";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const digitChars = "0123456789";
    const specialChars = "!@#$%^&*()_+-=";

    if (checkedUppercase) {
      charList += upperCaseChars;
    }
    if (checkedLowercase) {
      charList += lowerCaseChars;
    }
    if (checkedNumbers) {
      charList += digitChars;
    }
    if (checkedSpecial) {
      charList += specialChars;
    }

    const newPassword = p ? p : createPassword(charList, length);
    console.log(newPassword);
    setCopied(false);
    setPassword(newPassword);
  };

  useEffect(() => {
    setNewPassword();
  }, [
    length,
    checkedLowercase,
    checkedUppercase,
    checkedSpecial,
    checkedNumbers,
  ]);

  return (
    <div className="App">
      <Card
        overrides={{
          Root: {
            style: {
              left: "50%",
              maxWidth: "420px",
              position: "absolute",
              top: "20px",
              transform: "translate(-50%, 0)",
              width: "95vw",
              textAlign: "center",
            },
          },
        }}
        title="Password Generator"
      >
        <StyledBody>
          This password generator will create a random password for you
          according to the options set.
        </StyledBody>
        <Input
          value={password}
          onChange={(event) => setNewPassword(event.target.value)}
          clearOnEscape
          overrides={{
            Root: {
              style: (props) => {
                const {
                  $disabled,
                  $error,
                  $isFocused,
                  $theme: { colors, sizing },
                } = props;
                const border = $disabled
                  ? colors.borderTransparent
                  : $error
                  ? colors.borderNegative
                  : $isFocused
                  ? "darkseagreen"
                  : colors.borderOpaque;
                return {
                  borderLeftColor: border,
                  borderRightColor: border,
                  borderTopColor: border,
                  borderBottomColor: border,
                  boxShadow: `0 0 ${sizing.scale100} ${
                    $disabled
                      ? "transparent"
                      : $error
                      ? colors.shadowError
                      : $isFocused
                      ? "lightseagreen"
                      : "transparent"
                  }`,
                };
              },
            },
            After: () => (
              <Button
                kind={KIND.tertiary}
                shape={SHAPE.square}
                onClick={() => setNewPassword()}
              >
                <svg
                  className={useCss({
                    height: theme.sizing.scale800,
                    width: theme.sizing.scale800,
                  })}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#aaaaaa"
                    d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
                  />
                </svg>
              </Button>
            ),
          }}
        />
        <StyledAction>
          <Button
            onClick={copyToClipboard}
            overrides={{
              BaseButton: {
                style: {
                  width: "60%",
                  margin: "20px",
                  backgroundColor: copied
                    ? theme.colors.positive400
                    : theme.colors.negative400,
                },
              },
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </StyledAction>
        <Accordion>
          <Panel
            overrides={{
              Header: {
                style: () => ({
                  fontSize: "1.2rem",
                  textAlign: "left",
                }),
              },
            }}
            title="Options"
          >
            <Block marginBottom="scale800">
              <FormControl
                overrides={{
                  Label: {
                    style: () => ({
                      fontSize: "1.2rem",
                      textAlign: "left",
                    }),
                  },
                }}
                label="Length"
              >
                <Slider
                  overrides={{
                    ThumbValue: {
                      style: ({ $theme }) => ({
                        outline: `${$theme.colors.black} solid`,
                        backgroundColor: "blue",
                      }),
                    },
                    Root: {
                      style: {
                        margin: "30px 0px 5px 0px",
                      },
                    },
                    Thumb: {
                      style: {
                        backgroundColor: "green",
                      },
                    },
                  }}
                  value={[length]}
                  onChange={({ value }) => setLength(value[0])}
                  min={8}
                />
              </FormControl>
            </Block>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                borderWidth: "1px",
                flexDirection: "column",
                gap: "10px",
                marginLeft: "10px",
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                Characters:
              </div>
              <Checkbox
                checked={checkedUppercase}
                onChange={(e) => setCheckedUppercase(e.target.checked)}
                labelPlacement={LABEL_PLACEMENT.right}
                overrides={{
                  Checkmark: {
                    style: ({ $theme }) => ({
                      outline: `${$theme.colors.accent400} solid`,
                      backgroundColor: $theme.colors.accent400,
                      borderRadius: "3px",
                    }),
                  },
                }}
              >
                A-Z
              </Checkbox>
              <Checkbox
                checked={checkedLowercase}
                onChange={(e) => setCheckedLowerCase(e.target.checked)}
                labelPlacement={LABEL_PLACEMENT.right}
                overrides={{
                  Checkmark: {
                    style: ({ $theme }) => ({
                      outline: `${$theme.colors.accent400} solid`,
                      backgroundColor: $theme.colors.accent400,
                      borderRadius: "3px",
                    }),
                  },
                }}
              >
                a-z
              </Checkbox>
              <Checkbox
                checked={checkedNumbers}
                onChange={(e) => setCheckedNumbers(e.target.checked)}
                labelPlacement={LABEL_PLACEMENT.right}
                overrides={{
                  Checkmark: {
                    style: ({ $theme }) => ({
                      outline: `${$theme.colors.accent400} solid`,
                      backgroundColor: $theme.colors.accent400,
                      borderRadius: "3px",
                    }),
                  },
                }}
              >
                0-9
              </Checkbox>
              <Checkbox
                checked={checkedSpecial}
                onChange={(e) => setCheckedSpecial(e.target.checked)}
                labelPlacement={LABEL_PLACEMENT.right}
                overrides={{
                  Checkmark: {
                    style: ({ $theme }) => ({
                      outline: `${$theme.colors.accent400} solid`,
                      backgroundColor: $theme.colors.accent400,
                      borderRadius: "3px",
                    }),
                  },
                }}
              >
                #$%^&*!@?
              </Checkbox>
            </div>
          </Panel>
        </Accordion>
      </Card>
    </div>
  );
}

export default App;
