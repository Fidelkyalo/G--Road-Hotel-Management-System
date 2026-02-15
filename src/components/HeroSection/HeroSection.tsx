import ClientComponent from './ClientComponent';

import { heading1, section2 } from './ServerComponent';

/**
 * HeroSection component displaying the landing page hero area.
 * Composes ClientComponent with data from ServerComponent.
 * @returns {JSX.Element} The rendered HeroSection component.
 */
const HeroSection = () => {
  return <ClientComponent section2={section2} heading1={heading1} />;
};

export default HeroSection;
