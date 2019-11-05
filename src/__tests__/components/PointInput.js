/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import { render, getByPlaceholderText, fireEvent, wait } from '@testing-library/react';
import sinon from 'sinon';

import PointInput from '../../components/PointInput';
import { GlobalContext } from '../../store/provider';

describe('PointInput (component)', function() {
  const placeholderText = 'New point name';
  const spy = sinon.spy();
  const state = {
    api: {
      Map: {
        getMapCenter: spy,
      },
      Utils: {
        getAddress: spy,
      },
    },
    apiName: 'Yandex',
    points: [],
    loading: true,
    map: null,
  };

  const value = { state, dispatch: spy };

  it('is rendered', async () => {
    const { container } = render(
      <GlobalContext.Provider value={value}>
        <PointInput />
      </GlobalContext.Provider>
    );
    expect(getByPlaceholderText(container, placeholderText)).exist;
  });

  it('is changed when typing', async () => {
    const { container } = render(
      <GlobalContext.Provider value={value}>
        <PointInput />
      </GlobalContext.Provider>
    );
    const input = getByPlaceholderText(container, placeholderText);
    const pointName = 'test point';
    fireEvent.change(input, { target: { value: pointName } });
    expect(input.value).to.be.equal(pointName);
  });

  it('is not adding point without name', async () => {
    const { container } = render(
      <GlobalContext.Provider value={value}>
        <PointInput />
      </GlobalContext.Provider>
    );
    const input = getByPlaceholderText(container, placeholderText);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyUp(input, { key: 'Enter', keyCode: 13 });
    expect(spy.called).to.be.false;
  });

  it('is adding point', async () => {
    const { container } = render(
      <GlobalContext.Provider value={value}>
        <PointInput />
      </GlobalContext.Provider>
    );
    const input = getByPlaceholderText(container, placeholderText);
    const pointName = 'test point name';
    fireEvent.change(input, { target: { value: pointName } });
    fireEvent.keyUp(input, { key: 'Enter', keyCode: 13 });
    expect(spy.called).to.be.true;
    await wait(() => {
      expect(input.value).to.be.equal('');
    });
  });
});
