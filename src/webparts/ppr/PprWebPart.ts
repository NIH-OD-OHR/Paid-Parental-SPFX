import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './PprWebPart.module.scss';

export interface IPprWebPartProps {
}

export default class PprWebPart extends BaseClientSideWebPart<IPprWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.ppr}">
        <h2>Paid Parental Leave Eligibility Tool</h2>
        <hr style="border: 3px solid #ccc; margin: 10px 0;" />
        <p>
          PPL grants up to 12 weeks of paid leave to eligible Federal employees, substituted for FMLA unpaid leave, in connection with the qualifying birth of an employee's child or the placement of a child with an employee for adoption or foster care.
          This is a tool that will help employees determine their eligibility for paid parental leave at NIH.
        </p>
  
        <form id="pplForm">
          <div id="q1">
            <p><strong>1. I am currently an...</strong></p>
            <label><input type="radio" name="employeeType" value="Federal" /> NIH Federal Employee</label><br/>
            <label><input type="radio" name="employeeType" value="Fellow" /> NIH Fellow</label><br/>
            <label><input type="radio" name="employeeType" value="Contractor" /> NIH Contractor</label>
          </div><br/>
  
          <div id="q2" style="display:none;">
            <p><strong>2. My work schedule is...</strong></p>
            <label><input type="radio" name="workSchedule" value="Full-time" /> Full-time</label><br/>
            <label><input type="radio" name="workSchedule" value="Part-time" /> Part-time</label><br/>
            <label><input type="radio" name="workSchedule" value="Intermittent" /> Intermittent</label>
          </div><br/>
  
          <div id="q3" style="display:none;">
            <p><strong>3. I have completed at least 12 months of Federal service...</strong></p>
            <label><input type="radio" name="has12Months" value="Yes" /> Yes</label><br/>
            <label><input type="radio" name="has12Months" value="No" /> No</label>
          </div><br/>
  
          <div id="q4" style="display:none;">
            <p><strong>4. I am on an appointment of more than 1 year in duration</strong></p>
            <label><input type="radio" name="isLongTerm" value="Yes" /> Yes</label><br/>
            <label><input type="radio" name="isLongTerm" value="No" /> No</label>
          </div><br/>
        </form>
  
        <div id="result" style="margin-top:20px;padding:10px;border:2px solid transparent;background-color:#F1F1F1;display:none;border-radius:5px;">
          <strong><span id="resultText"></span></strong>
        </div>
  
        <p style="margin-top: 20px;">
          For more information, visit 
          <a href="https://hr.nih.gov/benefits/leave/paid-parental-leave-ppl" target="_blank">NIH Guide to Parental Leave</a>
        </p>
      </div>
    `;
  
    const showElement = (id: string) => {
      (this.domElement.querySelector(`#${id}`) as HTMLElement).style.display = 'block';
    };
  
    const hideElement = (id: string) => {
      (this.domElement.querySelector(`#${id}`) as HTMLElement).style.display = 'none';
    };
  
    const showMessage = (message: string, type: 'success' | 'error' | 'warning') => {
      const resultBox = this.domElement.querySelector('#result') as HTMLElement;
      const resultText = this.domElement.querySelector('#resultText') as HTMLElement;
      resultBox.style.display = 'block';
    
      let icon = '';
      let iconColor = '';
      let bgColor = '';
      let borderColor = '';
      let extraLink = '';
    
      if (type === 'success') {
        icon = '&#9989;'; // ✅
        iconColor = '#2e7d32';
        bgColor = '#E8F5E9';
        borderColor = '#4CAF50';
        extraLink = `
          <p style="margin-top: 10px;">
            For more information, visit 
            <a href="https://hr.nih.gov/benefits/leave/paid-parental-leave-ppl/requesting-process" target="_blank">
              Process for Requesting Paid Parental Leave
            </a>
          </p>
        `;
      } else if (type === 'warning') {
        icon = '&#9888;'; // ⚠
        iconColor = '#FFA000';
        bgColor = '#FFF8E1';
        borderColor = '#FFA000';
      } else if (type === 'error') {
        icon = '&#10071;'; // ❗
        iconColor = '#f44336';
        bgColor = '#FFEBEE';
        borderColor = '#f44336';
      }
    
      resultBox.style.backgroundColor = bgColor;
      resultBox.style.borderColor = borderColor;
    
      resultText.innerHTML = `
        <div style="display: flex; align-items: flex-start;">
          <div style="font-size: 24px; color: ${iconColor}; margin-right: 10px;">${icon}</div>
          <div>${message}${extraLink}</div>
        </div>
      `;
    };

    




  
    const resetForm = () => {
      hideElement('q2');
      hideElement('q3');
      hideElement('q4');
      (this.domElement.querySelector('#result') as HTMLElement).style.display = 'none';
    };
  
    const notEligibleMessage = `
      You are not eligible for Paid Parental Leave.<br/><br/>
      Please visit the <a href="https://hr.nih.gov/benefits/leave/paid-parental-leave-ppl" target="_blank">NIH Guide to Parental Leave</a> or <a href="https://hr.nih.gov/benefits/leave/leave-bank" target="_blank">NIH Leave Bank</a> pages for other potential leave options.
    `;
    // <span style="font-size: 20px; color: #FFA000;">&#9888;</span>
    const handleEmployeeTypeChange = (value: string) => {
      resetForm();
      if (value === 'Federal') {
        showElement('q2');
      } else if (value === 'Fellow') {
        showMessage(
          `
          <div>
            
            <strong>You may be eligible for Paid Parental Leave.</strong><br/><br/>
            Only Title 42 employees hired via the Special Consultants (42 U.S.C. 209(f)); Service Fellows (42 U.S.C. 209(g)); or the Senior Biomedical Research and Biomedical Product Assessment Service (SBRBPAS) (42 U.S.C. 237(b)) authorities, including hires made via other Title 42 authorities under the 21st Century Cures Act are eligible for PPL.<br/><br/>
            If you are a Fellow other than a Federal Title 42 employee in one of the former categories, please refer to the 
            <a href="https://hr.nih.gov/benefits/leave/paid-parental-leave-ppl" target="_blank">NIH Guide to Parental Leave</a>, 
            <a href="https://hr.nih.gov/benefits/leave/leave-bank" target="_blank">NIH Leave Bank</a>, or contact your servicing Administrative Officer for other leave options.<br/><br/>
            Fellows hired under Title 5 Appointing Authorities may be eligible for PPL, contingent on appointment duration, work schedule, and length of service. Please contact <a href="mailto:WorkFlex@mail.nih.gov">WorkFlex@mail.nih.gov</a> for more information.
          </div>
          `,
          'warning'
        );
      } else if (value === 'Contractor') {
        showMessage(
          `
          You are not eligible for Paid Parental Leave.<br/><br/>
          Please contact your Contract supervisor or servicing Administrative Officer for information on your benefits.
          `,
          'error'
        );
      }
    };
  
    const handleWorkScheduleChange = (value: string) => {
      hideElement('q3');
      hideElement('q4');
      if (value === 'Intermittent') {
        showMessage(notEligibleMessage, 'error');
      } else {
        showElement('q3');
      }
    };
  
    const handleHas12MonthsChange = (value: string) => {
      hideElement('q4');
      if (value === 'Yes') {
        showElement('q4');
      } else {
        showMessage(notEligibleMessage, 'error');
      }
    };
  
    const handleIsLongTermChange = (value: string) => {
      if (value === 'Yes') {
        showMessage("You are eligible for Paid Parental Leave.", 'success');
      } else {
        showMessage(notEligibleMessage, 'error');
      }
    };
  
    this.domElement.querySelectorAll('input[name="employeeType"]').forEach(el => {
      el.addEventListener('change', () => handleEmployeeTypeChange((el as HTMLInputElement).value));
    });
  
    this.domElement.querySelectorAll('input[name="workSchedule"]').forEach(el => {
      el.addEventListener('change', () => handleWorkScheduleChange((el as HTMLInputElement).value));
    });
  
    this.domElement.querySelectorAll('input[name="has12Months"]').forEach(el => {
      el.addEventListener('change', () => handleHas12MonthsChange((el as HTMLInputElement).value));
    });
  
    this.domElement.querySelectorAll('input[name="isLongTerm"]').forEach(el => {
      el.addEventListener('change', () => handleIsLongTermChange((el as HTMLInputElement).value));
    });
  }
   
  

  

  



  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}












