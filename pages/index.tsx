import { increment, useTypedSelector, wrapper } from 'lib/store';

const Page = () => {
  const serverState = useTypedSelector((state) => state.fromServer.value);
  const clientState = useTypedSelector((state) => state.fromClient.value);

  return (
    <div>
      <h1>Page</h1>

      <h2>Server</h2>
      <p>{serverState}</p>

      <h2>Client</h2>
      <p>{clientState}</p>
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async (context) => {
  store.dispatch(increment());

  return {
    props: {},
  };
});

export default Page;
