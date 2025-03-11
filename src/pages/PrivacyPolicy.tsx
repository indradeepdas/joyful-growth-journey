
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-goodchild-background">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-goodchild-blue hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </div>
          
          <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold text-goodchild-text-primary mb-8">Privacy Policy & Data Collection Policy</h1>
            <p className="text-sm text-goodchild-text-secondary mb-8">Last Updated: January 17, 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">1. Introduction</h2>
              <p>
                Welcome to The GoodChild Project ("we," "our," or "us"). We are committed to protecting the privacy of both parents 
                and children who use our platform. This privacy policy explains how we collect, use, and protect your personal 
                information in compliance with the General Data Protection Regulation (GDPR).
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">2.1 Parent Account Information</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Account credentials</li>
                <li>Contact information</li>
                <li>Payment information (if applicable)</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">2.2 Child Account Information</h3>
              <p>We collect minimal information about children, including:</p>
              <ul className="list-disc pl-5">
                <li>Username (we recommend not using real names)</li>
                <li>Age</li>
                <li>Activity data (chores completed, rewards earned)</li>
                <li>The GodCoin balance</li>
                <li>Image, if submitted by parent while creating account</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">3. How We Collect Information</h2>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">3.1 Direct Collection</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Information provided during account creation</li>
                <li>Data generated through platform usage</li>
                <li>Communication preferences</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">3.2 Automatic Collection</h3>
              <ul className="list-disc pl-5">
                <li>Device information</li>
                <li>Log data</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">4. How We Use Your Information</h2>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">4.1 Parent Account Information</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Account management</li>
                <li>Platform functionality</li>
                <li>Communication about service updates</li>
                <li>Customer support</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">4.2 Child Account Information</h3>
              <ul className="list-disc pl-5">
                <li>Platform functionality</li>
                <li>Chore tracking</li>
                <li>Reward management</li>
                <li>Progress monitoring</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">5. Legal Basis for Processing</h2>
              <p>We process personal data under the following legal bases:</p>
              <ul className="list-disc pl-5">
                <li>Parental consent for processing children's data</li>
                <li>Contract fulfillment</li>
                <li>Legal obligations</li>
                <li>Legitimate interests</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">6. Data Protection Measures</h2>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">6.1 Security</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Data encryption in transit and at rest</li>
                <li>Secure authentication systems</li>
                <li>Regular security audits</li>
                <li>Employee training on data protection</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">6.2 Data Retention</h3>
              <ul className="list-disc pl-5">
                <li>Account information: Retained while account is active</li>
                <li>Activity data: 24 months</li>
                <li>Deleted account data: 30 days for backup purposes</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">7. Your Rights Under GDPR</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request data deletion</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">8. Children's Privacy Rights</h2>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">8.1 Parental Controls</h3>
              <p>Parents/guardians have:</p>
              <ul className="list-disc pl-5 mb-4">
                <li>Full access to child's account information</li>
                <li>Ability to modify or delete child's data</li>
                <li>Control over privacy settings</li>
                <li>Right to withdraw consent</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">8.2 Child's Rights</h3>
              <p>Children can:</p>
              <ul className="list-disc pl-5">
                <li>Access their account with parent-approved restrictions</li>
                <li>Request changes through parent/guardian</li>
                <li>Use platform features within parental controls</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">9. Data Sharing and Third Parties</h2>
              <p>We do not:</p>
              <ul className="list-disc pl-5 mb-4">
                <li>Sell personal information</li>
                <li>Share data with third parties for marketing</li>
              </ul>
              <p>We may share data with:</p>
              <ul className="list-disc pl-5">
                <li>Service providers necessary for platform operation</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">10. Data Collection Policy</h2>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">10.1 Purpose Limitation</h3>
              <p>We collect data solely for:</p>
              <ul className="list-disc pl-5 mb-4">
                <li>Platform functionality</li>
                <li>User experience improvement</li>
                <li>Security and fraud prevention</li>
                <li>Legal compliance</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">10.2 Data Minimization</h3>
              <p>We:</p>
              <ul className="list-disc pl-5 mb-4">
                <li>Collect only necessary information</li>
                <li>Regularly review data necessity</li>
                <li>Delete unnecessary data</li>
                <li>Anonymize data where possible</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-goodchild-text-primary mb-2">10.3 Storage Limitation</h3>
              <ul className="list-disc pl-5">
                <li>Data stored in EU-based servers</li>
                <li>Regular data purging schedules</li>
                <li>Automatic deletion of inactive accounts</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">11. Contact Information</h2>
              <p>Data Protection Officer:</p>
              <ul className="list-disc pl-5">
                <li>Email: support@thegoodchildproject.com</li>
              </ul>
            </section>
            
            {/* Display the remaining sections */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">12. Updates to This Policy</h2>
              <p>We may update this policy to reflect:</p>
              <ul className="list-disc pl-5 mb-4">
                <li>Platform changes</li>
                <li>Legal requirements</li>
                <li>Privacy practice improvements</li>
              </ul>
              <p>Users will be notified of significant changes via:</p>
              <ul className="list-disc pl-5">
                <li>Email notification</li>
                <li>Platform announcement</li>
                <li>Website notice</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">13. Cookie Policy</h2>
              <p>We use essential cookies for:</p>
              <ul className="list-disc pl-5 mb-4">
                <li>Authentication</li>
                <li>Security</li>
                <li>Platform functionality</li>
              </ul>
              <p>No third-party tracking cookies are used.</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">14. Complaint Procedures</h2>
              <p>To file a complaint:</p>
              <ol className="list-decimal pl-5">
                <li>Contact our DPO</li>
                <li>We'll respond within 30 days</li>
                <li>Right to contact supervisory authority</li>
              </ol>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">15. Data Breach Procedures</h2>
              <p>In case of a data breach:</p>
              <ol className="list-decimal pl-5">
                <li>Investigation within 24 hours</li>
                <li>Notification within 72 hours if required</li>
                <li>Remediation measures implementation</li>
                <li>Post-incident analysis</li>
              </ol>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">16. Special Provisions for EU Users</h2>
              <p>Additional rights for EU users:</p>
              <ul className="list-disc pl-5">
                <li>Cross-border data transfer protections</li>
                <li>Right to lodge complaints with local DPA</li>
                <li>Specific member state protections</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">17. Declaration of Consent</h2>
              <p>By using our platform:</p>
              <ul className="list-disc pl-5">
                <li>Parents consent to data processing</li>
                <li>Parents provide consent for child's data</li>
                <li>Users agree to terms and conditions</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
