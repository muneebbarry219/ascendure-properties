import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPolicy from '../PrivacyPolicy';

describe('PrivacyPolicy', () => {
  it('renders the KSA PDPL privacy policy content', () => {
    render(<PrivacyPolicy />);

    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Saudi Arabia Personal Data Protection Law/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Rights/i)).toBeInTheDocument();
  });
});
