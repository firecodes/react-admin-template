import React, { createContext, FC, useEffect, useState } from 'react';
import { useCreation } from 'ahooks';
import { HomeProcessor } from './HomeProcessor';
import { useProcessorSelector } from '@/libs/utils'

const Context = createContext({} as HomeProcessor)
export interface IHomeProviderProps {
  children: React.ReactElement;
}
export const HomeProvider: FC<IHomeProviderProps> = React.memo(({ children }) => {
  const [initStutus, setInitStutus] = useState(false)
  let processorAction = useCreation(() => { return HomeProcessor.create() }, [])
  let { processor } = processorAction || {}

  useEffect(() => {
    // processor.initTask()
    setInitStutus(true)
    return () => { processor?.destroy() }
  }, [])
  if (!initStutus) { return null }
  return <Context.Provider value={processor}>{children}</Context.Provider>
})

export function useHomeProvider<R>(selector: (s: HomeProcessor) => R) {
  return useProcessorSelector(Context, selector);
}
