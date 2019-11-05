/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import { render, getByText, fireEvent } from '@testing-library/react';
import sinon from 'sinon';

import CleanPoints from '../../components/CleanPoints';
import { GlobalContext } from '../../store/provider';

describe('CleanPoints (component)', function() {
  const dispatch = sinon.spy();
  const cleanText = 'Clean all';
  it('is rendered', async () => {
    const { container } = render(
      <GlobalContext.Provider value={{ dispatch }}>
        <CleanPoints />
      </GlobalContext.Provider>
    );
    expect(getByText(container, cleanText)).exist;
  });

  it('is "cleaning"', async () => {
    const { container } = render(
      <GlobalContext.Provider value={{ dispatch }}>
        <CleanPoints />
      </GlobalContext.Provider>
    );
    const cleanButton = getByText(container, cleanText);
    fireEvent.click(cleanButton);
    expect(dispatch.called).to.be.true;
  });
});
