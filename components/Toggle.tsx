import {
  ButtonHTMLAttributes,
  createContext,
  DetailedHTMLProps,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";

import { useUpdateEffect } from "react-use";

type ToggleProps = {
  children?: any;
  onToggle?: (toggleState: boolean) => void;
};

type ToggleContextType = {
  on: boolean;
  toggle: () => any;
};

const ToggleContext = createContext<ToggleContextType>({
  on: false,
  toggle: () => {},
});

function useToggleContext() {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("Warning: Context is being used outside of a provider");
  }
  return context;
}

function Toggle({ children, onToggle }: ToggleProps) {
  const [on, setOn] = useState(false);
  useUpdateEffect(() => {
    onToggle && onToggle(on);
  }, [on, onToggle]);

  const toggle = () => setOn((prevOn) => !prevOn);

  const contextValue = { on, toggle };
  return (
    <ToggleContext.Provider value={contextValue}>
      {children}
    </ToggleContext.Provider>
  );
}

const On: FC = ({ children }) => {
  const { on } = useToggleContext();

  return on ? <>{children}</> : null;
};
Toggle.On = On;

const Off: FC = ({ children }) => {
  const { on } = useToggleContext();

  return on ? null : <>{children}</>;
};

Toggle.Off = Off;

Toggle.Button = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  const { on, toggle } = useToggleContext();

  return (
    <button {...props} onClick={() => toggle()}>
      {props.children}
    </button>
  );
};

export default Toggle;
