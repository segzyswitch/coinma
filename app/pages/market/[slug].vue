<script setup lang="ts">
useHead({
  title: 'All Markets - Coinma',
});
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

// Inport router
import { useRouter } from 'vue-router';
// Use the router instance
const router = useRouter();
// Inport router
import { useRoute } from 'vue-router';
// Use the router instance
const route = useRoute();
// Import API
import Request from '~/services/api';
// SweetAlert
const { $swal } = useNuxtApp();

const sendType = ref(null);
// Copy wallet address
function copyText(text: string) {
  navigator.clipboard.writeText(text)
  .then(() => {
    alert('Copied!');
  })
  .catch(() => {
    alert('Failed to copy.');
  });
}
;
const Asset:any = ref({});
const loadReq = ref(true);

async function getAsset() {
  loadReq.value = true;
  try {
    const response = await Request.assetBySlug(route.params.slug);
    // console.log(response.data);
    Asset.value = response.data.data;    
    loadReq.value = false;
  } catch (err:any) {
    console.log(err);
    loadReq.value = false;
    $swal.fire({
      title: 'Error!',
      icon: 'warning',
      text: err?.response?.data?.message ?? 'Error occurred, try again',
    });
  }
}

onMounted(() => {
  getAsset();
});
</script>

<template>
  <section class="p-3 mb-3 pb-4">
    <p class="mb-4">
      <button class="btn p-1 me-0 text-light" @click="router.back" aria-label="Close">
        <i class="bi bi-arrow-left"></i> <span class="ps-2">back</span>
      </button>
    </p>
    <p class="text-center py-5 text-mid" v-if="loadReq">
      <i class="spinner-border"></i>
    </p>
    <div class="w-100" v-else>
      <div class="row">
        <div class="col-4 col-sm-1 mx-auto mb-3 rounded-circle overflow-hidden mb-4">
          <img :src="Asset.icon" class="w-100" alt="BTC" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 text-center mx-auto">
          <h4 class="text-mid mb-1">{{ Asset.name }}</h4>
          <h2 class="text-light mb-1">{{ Request.formatToCurrency(Asset.volume_price) }}</h2>
          <p class="text-muted">{{ `${Asset.volume} ${Asset.unit}` }}</p>
          <div class="w-100 d-flex justify-content-around py-4">
            <button class="btn p-2 px-3 round-15 bg-dark-mid text-mid" data-bs-toggle="modal" data-bs-target="#sendModal">
              <i class="bi bi-send d-block h4"></i>
              <small class="d-block" style="padding:0 3px;">Send</small>
            </button>
            <button class="btn p-2 round-15 bg-dark-mid text-mid" data-bs-toggle="modal" data-bs-target="#recieveModal">
              <i class="bi bi-send d-block h4" style="transform: rotate(180deg);"></i>
              <small class="d-block" style="padding:0 2px;">Recieve</small>
            </button>
            <button class="btn p-2 px-4 round-15 bg-dark-mid text-mid">
              <i class="bi bi-credit-card d-block h4"></i>
              <small class="d-block">Buy</small>
            </button>
            <button class="btn p-2 px-3 round-15 bg-dark-mid text-mid">
              <i class="bi bi-arrow-left-right d-block h4"></i>
              <small class="d-block">Swap</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="col-sm-9 mx-auto py-4 mb-4" v-if="loadReq==false">
    <div class="w-100 d-flex p-3 gap-2 bg-dark round-15">
      <div class="my-auto text-start">
        <h5 class="text-light mb-3">{{ `${Asset.name}` }}</h5>
        <p class="m-0 text-mid">{{ `${Asset.unit}` }}</p>
      </div>
      <div class="m-auto text-end text-muted ps-3">
        <p class="mb-3 text-mid">{{ Request.formatToCurrency(Asset.price) }}</p>
        <p v-if="Asset.rate_status=='up'" class="text-teal m-0"><i class="bi bi-arrow-up"></i>{{ Asset.rate_change }}%</p>
        <p v-else class="text-danger m-0"><i class="bi bi-arrow-down"></i>{{ Asset.rate_change }}%</p>
      </div>
      <div class="my-auto ms-auto overflow-hidden">
        <div style="max-width:100%;max-height:120px;"><LineChart :rate-drop="Asset.rate_status" /></div>
      </div>
    </div>
  </section>

  <AllAssets />

  
  <!-- Send Modal -->
  <div class="modal fade" id="sendModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="sendModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header text-center row">
          <div class="col-2 col-sm-3 text-start">
            <button v-if="!sendType" class="btn p-1 me-0 text-light" data-bs-dismiss="modal" aria-label="Close">
              <i class="bi bi-arrow-left"></i> <span class="ps-2 d-none d-sm-inline">close</span>
            </button>
            <button v-else class="btn p-1 me-0 text-light" @click="sendType = null">
              <i class="bi bi-arrow-left"></i> <span class="ps-2 d-none d-sm-inline">back</span>
            </button>
          </div>
          <h5 class="modal-title col-8 col-sm-6 my-auto me-auto" id="sendModalLabel">Send {{ Asset.name }}</h5>
        </div>
        <div class="modal-body py-5 px-4 text-center">
          <div class="w-100 howtosend" v-if="!sendType">
            <h4 class="mb-2">Choose how to send!</h4>
            <div class="w-100 pt-3">
              <label class="send-options">
                <input v-model="sendType" type="radio" name="send-type" value="crypto" class="check" />
                <div class="button w-100 text-mid btn bg-dark-mid p-3 d-flex mb-3 rounded-3">
                  <div class="rounded-circle aspect-ratio-1x1 my-auto p-2 bg-primary"><i class="bi bi-send px-1"></i></div>
                  <div class="my-auto ps-3 text-start">
                    <p class="m-0">Send {{ Asset.unit }}</p>
                    <small class="text-mute">Send {{ Asset.unit }} to an external {{ Asset.name }} wallet</small>
                  </div>
                </div>
              </label>
              <label class="send-options">
                <input v-model="sendType" type="radio" name="send-type" value="funds" class="check" />
                <div class="button w-100 text-mid btn bg-dark-mid p-3 d-flex mb-3 rounded-3">
                  <div class="rounded-circle aspect-ratio-1x1 my-auto p-2 bg-teal"><i class="bi bi-bank px-1"></i></div>
                  <div class="my-auto ps-3 text-start">
                    <p class="m-0">Send money</p>
                    <small class="text-mute">Send funds to your bank account</small>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <form @submit.prevent class="w-100 crypto my-forms text-start" v-if="sendType==='crypto'">
            <h5 class="mb-4">Send to external wallet</h5>
            <div class="form-group">
              <label>Sending from:</label>
              <div class="w-100 d-flex gap-3 px-3 form-control">
                <img :src="Asset.icon" width="50" alt="BTC" class="rounded-circle my-auto" />
                <div class="my-auto">
                  <p class="text-mid mb-1">{{ Asset.name }}</p>
                  <h5 class="text-light mb-0">{{ `${Asset.volume} ${Asset.unit}` }}</h5>
                </div>
                <div class="my-auto ms-auto">
                  <p class="my-auto">{{ Request.formatToCurrency(Asset.volume_price) }}</p>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="amt">Amount:</label>
              <input type="text" class="form-control" id="amt" placeholder="Enter amount" required />
            </div>
            <div class="form-group">
              <label for="address">Wallet Address:</label>
              <input type="text" class="form-control" id="address" placeholder="Enter wallet address" required />
              <small class="d-block mt-1 text-muted">Make sure the above is a Bitcoin wallet, sending Bitcoin to other wallets may result in performance loss</small>
            </div>
            <p class="pt-3 mb-0">
              <button type="button"  class="btn btn-primary px-4 py-2">Continue</button>
            </p>
          </form>
          <form @submit.prevent class="w-100 funds my-forms text-start" v-if="sendType==='funds'">
            <h5 class="mb-4">Send to Bank</h5>
            <p class="mb-4">Enter the recipicient bank details below</p>
            <div class="form-group">
              <label>Sending from:</label>
              <div class="w-100 d-flex gap-3 px-3 form-control">
                <img :src="Asset.icon" width="50" alt="BTC" class="rounded-circle my-auto" />
                <div class="my-auto">
                  <p class="text-mid mb-1">{{ Asset.name }}</p>
                  <h5 class="text-light mb-0">{{ `${Asset.volume} ${Asset.unit}` }}</h5>
                </div>
                <div class="my-auto ms-auto">
                  <p class="my-auto">{{ Request.formatToCurrency(Asset.volume_price) }}</p>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="amt">Amount:</label>
              <input type="text" class="form-control" id="amt" placeholder="Enter amount" required />
            </div>
            <div class="form-group">
              <label for="account">Account number:</label>
              <input type="text" class="form-control" id="account" placeholder="Enter account number" required />
            </div>
            <div class="form-group">
              <label for="name">Account name:</label>
              <input type="text" class="form-control" id="name" placeholder="Enter bank name" required />
            </div>
            <div class="form-group">
              <label for="bname">Bank name:</label>
              <input type="text" class="form-control" id="bname" placeholder="Enter bank name" required />
            </div>
            <div class="form-group">
              <label for="country">Bank region:</label>
              <select class="form-control" required id="country">
                <option value="">Select country</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Aland Islands">Aland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, Democratic Republic of the Congo">Congo, Democratic Republic of the Congo</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Curacao">Curacao</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">French Southern Territories</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kosovo">Kosovo</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, the Former Yugoslav Republic of">Macedonia, the Former Yugoslav Republic of</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                <option value="Moldova, Republic of">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">Netherlands Antilles</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Barthelemy">Saint Barthelemy</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Martin">Saint Martin</option>
                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Sint Maarten">Sint Maarten</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                <option value="South Sudan">South Sudan</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-Leste">Timor-Leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">Virgin Islands, British</option>
                <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>
            <p class="pt-3 mb-0">
              <button type="button"  class="btn btn-success bg-teal px-4 py-2">Send now</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Recieve Modal -->
  <div class="modal fade" v-if="loadReq==false" id="recieveModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="recieveModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header text-center row">
          <div class="col-2 col-sm-3 text-start">
            <button class="btn p-1 me-0 text-light" data-bs-dismiss="modal" aria-label="Close">
              <i class="bi bi-arrow-left"></i> <span class="ps-2 d-none d-sm-inline">close</span>
            </button>
          </div>
          <h5 class="modal-title col-8 col-sm-6 my-auto me-auto" id="recieveModalLabel">Recieve</h5>
        </div>
        <div class="modal-body py-5 px-4 text-center">
          <div class="w-100 crypto my-forms">
            <h4 class="mb-3">Fund {{ Asset.name }} wallet</h4>
            <small class="d-block mb-4">Send only {{ Asset.name }} ({{ Asset.unit }}) to this address, sending other networks or NFTs will result in performance loss</small>
            <div class="form-group py-4">
              <div class="p-3 bg-dark-mid round-15 col-7 mx-auto">
                <img :src="Asset.qr_code" class="w-100" alt="" />
              </div>
            </div>
            <div class="form-group">
              <label for="address">Wallet Address:</label>
              <div class="form-control btn text-truncate">{{ Request.shortenAddress(Asset.wallet_address) }}</div>
            </div>
            <p class="mb-0">
              <button type="button" @click="copyText(Asset.wallet_address)" class="btn btn-sm btn-primary px-4 py-2"><i class="bi bi-copy pe-1"></i> Copy address</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.send-options {
  display: block;
  position: relative;
}
.send-options .check {
  position: absolute;
  right: 15px;
  top: 38%;
  scale: 1.3;
  opacity: 0;
}
.send-options .check:checked + .button {
  border-color: var(--thm-green);
  background-color: var(--thm-dark-focus)!important;
}
.send-options .button:hover {
  background-color: var(--thm-dark-focus)!important;
}
</style>