/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import { render, wait } from '@testing-library/react';
import sinon from 'sinon';

import Map from '../../components/Map';
import { GlobalContext } from '../../store/provider';

describe('Map component', function() {
  this.timeout(10000);
  it('loads Map component', async () => {
    const dispatch = sinon.spy();
    const state = {
      api: window.YMapService,
      apiName: 'YandexMap',
    };
    const { container } = render(
      <GlobalContext.Provider value={{ state, dispatch }}>
        <Map />
      </GlobalContext.Provider>
    );
    await wait(() => {
      expect(dispatch.called).to.be.true;
      expect(container.getElementsByTagName('ymaps')).exist;
    });
  });
});
