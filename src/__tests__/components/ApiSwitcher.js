/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import { render, getByText, fireEvent } from '@testing-library/react';
import sinon from 'sinon';

import ApiSwitcher from '../../components/ApiSwitcher';
import { GlobalContext } from '../../store/provider';

describe('ApiSwitcher (component)', function() {
  const dispatch = sinon.spy();
  const mapDestroy = sinon.spy();
  const mockApi = {
    Map: {
      destroy: mapDestroy,
    },
  };
  const state = {
    api: mockApi,
    apiName: 'Yandex',
  };

  it('is rendered', async () => {
    const { container } = render(
      <GlobalContext.Provider value={{ state, dispatch }}>
        <ApiSwitcher />
      </GlobalContext.Provider>
    );
    expect(getByText(container, 'Yandex Maps')).exist;
    expect(getByText(container, 'Google Maps')).exist;
  });

  it('is "changing" api', async () => {
    const { container } = render(
      <GlobalContext.Provider value={{ state, dispatch }}>
        <ApiSwitcher />
      </GlobalContext.Provider>
    );
    const gButton = getByText(container, 'Google Maps');
    fireEvent.click(gButton);
    expect(dispatch.called).to.be.true;
    expect(mapDestroy.called).to.be.true;
  });
});
