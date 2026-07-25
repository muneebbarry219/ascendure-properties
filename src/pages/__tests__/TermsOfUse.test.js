import React from 'react';
import { render, screen } from '@testing-library/react';
import TermsOfUse from '../TermsOfUse';

describe('TermsOfUse', () => {
  it('renders the terms of use content', () => {
    render(<TermsOfUse />);

    expect(screen.getByText(/Terms of Use/i)).toBeInTheDocument();
    expect(screen.getByText(/Website Use/i)).toBeInTheDocument();
    expect(screen.getByText(/Intellectual Property/i)).toBeInTheDocument();
  });
});
