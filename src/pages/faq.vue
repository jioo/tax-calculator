<template>
  <div class="uk-section uk-section-default">
    <div class="uk-container">
      <div class="uk-flex-center uk-child-width-1-1" uk-grid>

        <!-- Grid -->
        <div class="uk-width-1-1">
          <div class="uk-margin-large">
            <h3 class="uk-text-center" v-text="'Frequently Asked Questions'"></h3>
          </div>
        </div>
        <!-- ./Grid -->

        <!-- FAQs -->
        <div>
          <ul uk-accordion>
            <li 
              v-for="(item, index) in items"
              :class="['uk-padding-small', (index % 2 !== 0) ? 'uk-background-muted' : '']"
            >
              <a class="uk-accordion-title" href="#" v-text="item.title"></a>
              <div class="uk-accordion-content">
                <p v-html="item.content"></p>
              </div>
            </li>
          </ul>
        </div>
        <!-- ./FAQs -->

        <div class="uk-margin-large">
          <Adsense
            data-ad-client="ca-pub-8996756097719643">
          </Adsense>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: require('@/assets/img/logo.png'),
      items: [
        {
          title: 'How can I use the calculator in Offline mode?',
          content: `
          Just load the App once and you can use it without Internet / Data. <br/><br/>

          More info: <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers" target="_blank" rel="noreferrer">Link</a>
          `,
        },
        {
          title: 'How did you calculate Annual, Monthly, Semi Monthly, Weekly & Daily Salary?',
          content: `
          <h4>Annual Salary</h4>
          Monthly Salary * 12 Months

          <h4>Monthly Salary</h4>
          Annual Salary / 12 Months

          <h4>Semi Monthly Salary</h4>
          Monthly Salary / 2
          
          <h4>Weekly Salary</h4>
          Annual Salary / 52 Weeks

          <h4>Daily Salary</h4>
          Weekly Salary / No. of working days per week
          `,
        },
        {
          title: 'Monthly Contributions (SSS, GSIS, PAGIBIG, PhilHealth) Formula?',
          content: `
          <h4>Social Security System (SSS)</h4>
          Source: <a class="default-link" href="https://philpad.com/new-sss-contribution-table/" target="_blank" rel="noreferrer">https://philpad.com/new-sss-contribution-table/</a>

          <h4>Government Service Insurance System (GSIS)</h4>
          Source: <a class="default-link" href="https://www.gsis.gov.ph/active-members/contributions/" target="_blank" rel="noreferrer">https://www.gsis.gov.ph/active-members/contributions/</a>
          <p>Section 11 of the Revised Implementing Rules and Regulations of RA 8291 approved on June 23, 2010 under Board Resolution No. 88 provides that the rate of contribution payable by 
          the member and the government agency shall be nine (9) per cent and 12 per cent, respectively, based on the actual monthly salary of the member.</p>

          <h4>Pagtutulungan sa Kinabukasan: Ikaw, Bangko, Industria at Gobyerno (PAGIBIG)</h4>
          Source: <a class="default-link" href="https://powerpinoys.com/new-pagibig-contribution-table/" target="_blank" rel="noreferrer">https://powerpinoys.com/new-pagibig-contribution-table/</a>
          
          <h4> Philippine Health Insurance Corporation (PhilHealth)</h4>
          Source: <a class="default-link" href="https://www.philhealth.gov.ph/advisories/2018/adv2018-0003.pdf" target="_blank" rel="noreferrer">PDF Link</a>
          `,
        },
        {
          title: '2018~2022 & 2023 BIR Withholding Tax Table?',
          content: `
          <h4>Withholding Tax Table (January 1, 2018 to December 31, 2022 )</h4>
          Source: <a class="default-link" href="https://www.bir.gov.ph/images/bir_files/internal_communications_2/RMCs/2018/WT%20table.pdf" target="_blank" rel="noreferrer">PDF Link</a>

          <h4>Withholding Tax Table (January 1, 2023 onwards)</h4>
          Source: <a class="default-link" href="https://www.pinoymoneytalk.com/new-income-tax-table-rates-philippines/" target="_blank" rel="noreferrer">https://www.pinoymoneytalk.com/new-income-tax-table-rates-philippines/</a>
          `,
        },
        {
          title: 'How to calculate Withholding Tax?',
          content: `
          <h4>1.) Determine your Taxable Income</h4>
          <b>Taxable Income</b> = (Monthly Basic Pay + Overtime Pay + Holiday Pay + Night Differential) – (SSS/PAGIBIG/PhilHealth deductions – Tardiness – Absences) <br/><br/>
          
          <b>For Example:</b> <br/>
          <u>Monthly Basic Pay:</u> ₱55,000.00<br/>
          <u>Late Deduction:</u> ₱487.23<br/>
          <u>SSS Contribution:</u> ₱800.00<br/>
          <u>PagIBIG Contribution:</u> ₱100.00<br/>
          <u>PhilHealth Contribution:</u> ₱550.00<br/><br/>

          <b>Your Taxable Income</b> <br/>
          = ₱55,000.00 - ₱487.23 - ₱800.00 - ₱100.00 - ₱550.00 <br/>
          = <b>₱53,062.77</b>

          <h4>2.) Check BIR Tax Table</h4>
          <p>Under Monthly Compensation Level (CL) look for the nearest figures with your taxable income (₱53,062.77).<br/>
          The amount is ₱33,333 ~ ₱66,6666 and the tax is <b>" ₱2,500 + 25% over ₱33,333 "</b>.</p>

          <b>Your Withholding Tax</b> <br/>
          = ₱2,500 + 25% over ₱33,333 <br/>
          = ₱2,500 + (₱53,062.77 - ₱33,333) * 0.25 <br/>
          = ₱2,500 + (₱19,729.77 * 0.25) <br/>
          = ₱2,500 +  ₱4,932.44 <br/>
          = <b>₱7,432.44</b>
          `,
        },
        {
          title: 'How did you calculate the deductions for Absences & Tardiness? (Payroll Calculator)',
          content: `
          <h4>Absences</h4>
          <p>(Monthly Salary / No. of Working Days) * No. of Absents</p>

          <h4>Tardiness</h4>
          <p>((Monthly Salary / No. of Working Days) / 24 Hours / 60 Minutes) * Minutes of late(Tardiness)</p>
          `,
        },
        {
          title: 'Official Holidays Source?',
          content: `
          Sources: 
          <a class="default-link" href="https://www.officeholidays.com/countries/philippines/index.php" target="_blank" rel="noreferrer">2019</a>
          <a class="default-link" href="https://publicholidays.ph/2020-dates/" target="_blank" rel="noreferrer">2020</a>
          `,
        },
      ]
    }
  }
}
</script>

<style lang="css">
  .default-link {
    color: #1e87f0 !important;
  }

  .default-link:hover {
    color: #0f6ecd !important;
  }
</style>
