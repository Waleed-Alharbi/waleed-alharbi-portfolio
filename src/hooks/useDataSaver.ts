import { useEffect, useState } from 'react';

type NetworkInformation = EventTarget & {
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
};

function dataSaverEnabled() {
  return Boolean((navigator as NavigatorWithConnection).connection?.saveData);
}

export function useDataSaver() {
  const [saveData, setSaveData] = useState(dataSaverEnabled);

  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection;
    if (!connection) return undefined;

    const update = () => setSaveData(Boolean(connection.saveData));
    connection.addEventListener('change', update);
    return () => connection.removeEventListener('change', update);
  }, []);

  return saveData;
}
