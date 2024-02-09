import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskList from './components/CustomTaskList/CustomTaskList';

const PLUGIN_NAME = 'Cimb01Plugin';

export default class Cimb01Plugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const options = { sortOrder: -1 };
    flex.AgentDesktopView.Panel1.Content.add(<CustomTaskList key="Cimb01Plugin-component" />, options);
  }
}
