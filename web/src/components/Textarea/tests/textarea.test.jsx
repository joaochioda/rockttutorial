import React from 'react';
import Textarea from '../index';
import { render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

it('renders without crashing', ()=> {
    const mockFn = jest.fn()

    const { getByTestId } = render(<Textarea name="bio" label="Biografia" onChange={() => mockFn}/>);
    expect(getByTestId('textarea-test')).toHaveTextContent("Biografia");

    const areatext = getByTestId('textarea-test').querySelector('textarea');
    expect(areatext.value).toBe('');
   
    fireEvent.change(areatext, {  target: {value: '23'  }})
    expect(areatext.value).toBe('23')

})