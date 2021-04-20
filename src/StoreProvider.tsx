import { createContext, useContext, ReactNode, ReactElement } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import createRootStore from './stores/rootStore';

type RootStore = ReturnType<typeof createRootStore>;
const StoreContext = createContext<RootStore>({} as RootStore);

function StoreProvider({ children }: { children: ReactNode }): ReactElement {
  const store = useLocalObservable(createRootStore);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export default StoreProvider;

/* get store hooks */

export const useRootStore = () => useContext(StoreContext);

export const useAuthStore = () => {
  const { authStore } = useContext(StoreContext);
  return authStore;
};

export const useMessageStore = () => {
  const { messageStore } = useContext(StoreContext);
  return messageStore;
};

export const useUIStore = () => {
  const { uiStore } = useContext(StoreContext);
  return uiStore;
};

export const useLoginFormStore = () => {
  const { loginFormStore } = useContext(StoreContext);
  return loginFormStore;
};

export const useDashboardStore = () => {
  const { dashboardStore } = useContext(StoreContext);
  return dashboardStore;
};

export const useCarsDataStore = () => {
  const { carsDataStore } = useContext(StoreContext);
  return carsDataStore;
};

export const useAddVehicleStore = () => {
  const { addVehicleStore } = useContext(StoreContext);
  return addVehicleStore;
};

export const useMyVehiclesStore = () => {
  const { myVehiclesStore } = useContext(StoreContext);
  return myVehiclesStore;
};
