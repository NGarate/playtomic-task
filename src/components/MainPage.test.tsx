import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './MainPage';
import * as redux from 'react-redux';

jest.mock('react-redux');

describe('Main page', () => {
    const mockedDispatch = jest.fn();
    const basicState = {
        login: {},
        dashboard: {},
        settings: {}
    };

    beforeEach(() => {
        redux.useDispatch.mockImplementation(() => mockedDispatch);
        redux.useSelector.mockReturnValue(basicState);
    });

    test('renders correctly', () => {
        const tree = renderer.create(<MainPage />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
