import React from 'react';
import toJson from 'enzyme-to-json';
import MainPage from './MainPage';
import * as redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';

jest.mock('react-redux');
configure({ adapter: new Adapter() });

test('Main page renders correctly when user is authenticated', () => {
    const mockedDispatch = () => {
        // empty function
    };
    redux.useSelector.mockReturnValue({
        isAuthenticated: true,
        user: { userName: 'userName' }
    });
    redux.useDispatch.mockImplementation(() => mockedDispatch);

    const wrapper = shallow(<MainPage />);

    expect(toJson(wrapper)).toMatchSnapshot();
});

test('Main page renders correctly when user is not authenticated', () => {
    const mockedDispatch = () => {
        // empty function
    };
    redux.useSelector.mockReturnValue({
        isAuthenticated: false,
        user: { userName: 'userName' }
    });
    redux.useDispatch.mockImplementation(() => mockedDispatch);

    const wrapper = shallow(<MainPage />);

    expect(toJson(wrapper)).toMatchSnapshot();
});
