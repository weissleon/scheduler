import Toggle from "components/Toggle";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  hello: any;
}

const ToggleExample: NextPage<Props> = ({}) => {
  const onToggle = (state: boolean) => {
    console.log(`Current State: ${state}`);
  };
  return (
    <Toggle onToggle={onToggle}>
      <div className="grid justify-center">
        <Toggle.On>Toggle is On</Toggle.On>
        <Toggle.Off>Toggle is Off</Toggle.Off>
        <Toggle.Button>
          <div className="hover:bg-blue-300 min-w-[50px] bg-blue-200 py-2 px-1 rounded-md shadow-sm">
            <Toggle.On>On</Toggle.On>
            <Toggle.Off>Off</Toggle.Off>
          </div>
        </Toggle.Button>
      </div>
    </Toggle>
  );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  return { props: {} };
};

export default ToggleExample;
