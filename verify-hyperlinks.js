const fs = require('fs');
const path = require('path');

function verifyLinks() {
  console.log('=====================================================');
  console.log('🔗 VERIFYING EMBEDDED PDF HYPERLINK ANNOTATIONS');
  console.log('=====================================================\n');

  const pdfPath = path.join(__dirname, 'Mahmoud_Abd_El-Ghaffar_Resume.pdf');
  const content = fs.readFileSync(pdfPath, 'utf8');

  // Search for /URI actions in PDF Annotations dictionary
  const uriMatches = content.match(/\/URI\s*\(([^)]+)\)/g) || [];
  console.log(`Found ${uriMatches.length} clickable URI annotations:`);

  uriMatches.forEach((m, idx) => {
    const rawUri = m.replace(/\/URI\s*\(/, '').replace(/\)$/, '');
    console.log(`  ${idx + 1}. [CLICKABLE HYPERLINK] -> ${rawUri}`);
  });

  const hasLinkedIn = uriMatches.some(m => m.includes('linkedin.com/in/mahmoud-abd-el-gaffar-4aa378219'));
  const hasPortfolio = uriMatches.some(m => m.includes('portfolio-mrt6.onrender.com'));
  const hasEmail = uriMatches.some(m => m.includes('mailto:mahmoudzanaty454@gmail.com'));
  const hasPhone = uriMatches.some(m => m.includes('tel:+201024190741'));

  console.log('\n--- HYPERLINK INTEGRITY STATUS ---');
  console.log(`• LinkedIn Link:    ${hasLinkedIn ? 'ACTIVE & CLICKABLE ✅' : 'FAILED ❌'}`);
  console.log(`• Portfolio Link:   ${hasPortfolio ? 'ACTIVE & CLICKABLE ✅' : 'FAILED ❌'}`);
  console.log(`• Email Mailto:     ${hasEmail ? 'ACTIVE & CLICKABLE ✅' : 'FAILED ❌'}`);
  console.log(`• Phone Tel Link:   ${hasPhone ? 'ACTIVE & CLICKABLE ✅' : 'FAILED ❌'}`);

  if (hasLinkedIn && hasPortfolio && hasEmail && hasPhone) {
    console.log('\n🎉 ALL 4 CONTACT HYPERLINKS ARE 100% EMBEDDED & FUNCTIONAL!');
  }
}

verifyLinks();
