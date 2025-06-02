import React, { createContext, FC, useEffect, useState } from 'react';
import { HOME_SLIDER_VISIBLE_KEY } from '@/libs/data-store';
import {
  BaseProcessor,
  DataCell,
  generatePromiseWrap,
  persistenceCell,
  persistenceCellSync,
} from '@/libs/utils'

export class HomeProcessor extends BaseProcessor {
  modelSettingVisible = new DataCell<boolean>(false);
  sliderVisible = new DataCell<boolean>(false); // persistenceCellSync(HOME_SLIDER_VISIBLE_KEY, false);
  sliderVisibleSync = persistenceCellSync(HOME_SLIDER_VISIBLE_KEY, false);
  drawerVisible = new DataCell<boolean>(false);
  initTask = generatePromiseWrap();
  constructor() {
    super()
    this.init()
  }
  protected async init() {
    try {
      await Promise.all([persistenceCell(HOME_SLIDER_VISIBLE_KEY)]);
      this.initTask.resolve(undefined);
    } catch (error) {
      console.error(error);
      this.initTask.reject(error);
    }
  }
  collapseSlider = () => {
    this.sliderVisible.set(!this.sliderVisible.get());
    // this.sliderVisible = !this.sliderVisible
  };

  collapseModelSetting = () => {
    this.modelSettingVisible.set(!this.modelSettingVisible.get());
    // this.modelSettingVisible = !this.modelSettingVisible
  };

  collapseDrawer = () => {
    this.drawerVisible.set(!this.drawerVisible.get());
    // this.drawerVisible = !this.drawerVisible
  };
  /**
   * 私有方法外面获取不到
   */
  private handleTest() { }
  public handleTest2 = () => { };
}


// export function useHomeProcessorSelector<RC, R>(Context: React.Context<RC>, selector: (statu: RC) => R) {
//   const contextValue = React.useContext(Context)
//   const selectValue = selector(contextValue)
//   return useProcessorReturn(selectedValue) as DeepUnwrapDataCell<R>;
// }
// export function useHomeProcessorSelector<RC, R>(Context: React.Context<RC>, selector: (statu: RC) => R) {
//   return useProcessorSelector(Context, selector)
// }

