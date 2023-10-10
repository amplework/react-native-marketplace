export default {
  onBoarding: {
    title1: 'Welcome to Alpha',
    description1: 'Turn your skill into a business',
    title2: 'Connection',
    description2: 'Stay connected to your clients and\nreach new clients',
    title3: 'Schedule',
    description3:
      'Schedule client appointments and\nallow your clients to book directly',
    title4: 'Manage',
    description4: 'Manage & track your finances',
    getStarted: 'Get Started',
  },
  onBoardingClient: {
    title1: 'Welcome to Alpha',
    description1: 'Connect to your service provider',
    title2: 'Connect',
    description2:
      'Stay connected and easily\ncommunicate with service providers',
    title3: 'Schedule',
    description3: 'Schedule appointments directly and\nreceive notifications',
    getStarted: 'Get Started',
    facebook: 'Facebook',
    google: 'Google',
    alreadyUser: 'Already a user?',
    signIn: 'Sign In',
  },
  login: {
    title: 'Welcome back to Alpha',
    description:
      'Where service providers and clients, find each other and stay connected',
    emailField: 'Email',
    passwordField: 'Password',
    forgot: 'Forgot password',
    keepMe: 'Keep me signed in',
    getStarted: 'Get Started',
    newUser: 'New to Alpha?',
    loginTo: 'Login to Alpha',
    facebook: 'Facebook',
    google: 'Google',
  },
  forgot: {
    title: 'Reset Password',
    description:
      "Enter the email associated with your account and we'll send an email with instructions to reset your password",
    emailField: 'Email',
    send: 'Send instructions',
    back: 'Back to Login',
  },
  checkEmail: {
    title: 'Check your email',
    description:
      'Enter the verification code we just sent you on your email address',
    verify: 'Verify',
    expire: 'The code will expire in 24 hours',
    notGet: 'Did not get the code?',
    spam: '(Check your junk email too)',
    resend: 'Resend code',
  },
  changePassword: {
    title: 'Create new password',
    description:
      'Your new password must be different from previous used passwords',
    passwordField: 'Password',
    confirmPasswordField: 'Confirm password',
    reqPassword: 'Must be at least 8 characters',
    match: 'Both password must match',
    reset: 'Reset password',
  },
  successReset: {
    title: 'Password reset',
    description: 'Your password has been reset successfully!',
    continue: 'Continue',
  },
  chooseRole: {
    title: 'Choose your role',
    description: 'Choose role for your account',
    provider: 'Provider',
    client: 'Client',
    continue: 'Continue',
  },
  signup: {
    appName: 'Alpha',
    signup: 'Sign Up',
    title: 'Create an Account',
    description:
      'Sign up & stay connected to your existing clients and reach new clients',
    signUp: 'Signup with Email',
    existingUser: 'Existing alpha user?',
    signIn: 'Sign In',
    facebook: 'Facebook',
    google: 'Google',
    success: 'Registration successful, Please setup subscription.',
    fields: {
      email: 'Email',
    },
  },
  profileSetup: {
    title: 'Complete your profile',
    subHeading: 'Select and complete each option to access all features',
    explore: 'Complete the tasks and explore the app',
  },
  basicInfoClient: {
    title: 'Basic Info',
    description: 'Start with your email info & password setup',
    emailField: '*Email',
    passwordField: '*Password',
    continue: 'Continue',
  },
  onlinePaymentSettingsClient: {
    title: 'Online Payments Settings',
    description:
      'Would you like to pay for Provider services through the App? You’ll also be able to set up this option later in your settings.',
    switchTitle: 'Enable Online Payments option',
    continue: 'Continue',
  },
  addPaymentMethodSetupClient: {
    title:
      'Please set up your payment methods. You can skip this step if you want to use Apple/Google Pay for online payments.',
    description: 'Tap the Add New Card button to Add New Payment Card',
    addPaymentMethodButton: 'Add New Card',
    addPaymentMethod: 'Add Payment Method',
    editPaymentMethod: 'Edit Payment Method',
    cardHolderName: "Card Holder's Name",
    makeDefault: 'Make Default',
    addCard: 'Add',
    editCard: 'Save',
    continue: 'Continue',
    errors: {
      uniqCard: 'This card is already set to default',
    },
  },
  basicInfo: {
    title: 'Basic Info',
    description: 'Start with your basic info & password setup',
    emailField: '*Email',
    passwordField: '*Password',
    industryField: 'Industry',
    titleField: 'Title',
    pickIndustry: '*Pick industry',
    titlePick: '*Title',
    continue: 'Continue',
  },
  social: {
    title: 'Social Media',
    description:
      'Connect Alpha to your social media and post specials / discounts to your pages',
    continue: 'Save',
    skip: 'Skip Setup',
  },
  onlinePaymentSetup: {
    title: 'Online Payments',
    description: 'Setup your online methods to collect payments from the app',
    continue: 'Save',
    skip: 'Skip Setup',
  },
  verification: {
    title: 'Verify email',
    description:
      'Enter the verification code we just sent to your email to continue',
    notGet: 'Did not get the code?',
    spam: '(Check your junk email too)',
    resend: 'Resend code',
    continue: 'Continue',
  },
  personalInfo: {
    title: 'Personal Info',
    description: 'Enter your personal information',
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      telephone: 'Telephone',
      shopName: 'Business/Shop name',
      address: 'Address line',
      expectedPrice: 'Expected earning per week',
      gender: 'Gender',
      additionalAddress: 'Additional address details',
      logo: 'Business logo',
      countryCode: 'code',
    },
    logoDescription: 'Will be shown in all your Invoices, Receipts and Emails',
    continue: 'Save',
  },
  businessInfo: {
    title: 'Business details',
    description:
      'Enter additional details about your business / services (shown to clients searching for providers)',
    fields: {
      logo: 'Business Logo',
      shopName: 'Business/Shop name',
      expectedPrice: 'Expected earning per week',
      website: 'Link to website/other pages',
      about: 'Short description',
    },
    logoDescription: 'Will be shown in all your Invoices, Receipts and Emails',
    continue: 'Continue',
    addMoreLink: 'Add more links',
  },
  personalInfoClient: {
    title: 'Personal Info',
    description: 'Enter your personal information',
    firstName: '*First name',
    lastName: '*Last name',
    telephone: '*Telephone',
    otherNumber: 'WhatsApp / Other Number',
    otherNumberDetails: 'Whatsapp/other number',
    preference: 'Preference for notifications',
    moreDetails: 'More Details',
    birthday: 'Birthday',
    gender: 'Gender',
    continue: 'Continue',
    addressLine: 'Address Line',
    state: 'State',
    zip: 'Zip',
  },
  subscription: {
    continue: 'Continue',
    title: 'Pick Subscription',
    description: 'Select subscription of your choice',
    standard: 'Standard',
    premium: 'Premium',
    lite: 'Lite',
    titleColumn: 'Benefit',
    mth: '/mth',
    selectPlan: 'Select a plan',
    freePlanLeft: 'There are {{count}} days left in your free trial',
    accessToAppAndWeb: 'Access to app & website',
    accessForYou: 'Access for your clients',
    messageClients: 'Message clients from app',
    menageAppointments: 'Manage appointments',
    clientsBook: 'Clients book appointments directly',
    trackSales: 'Track sales to your clients',
    trackExpenses: 'Track expenses',
    createInvoice: 'Create and send invoice',
    trackVendorsExpenses: 'Track vendors and expenses',
    manageClients: 'Manage clients',
    sendInvoice: 'Create and send invoice',
    salesAdvertising: 'Sales advertising & promotions',
    loyaltyProgram: 'Loyalty program',
    socialMedia: 'Social media integration',
    invoices: 'Invoices',
    acceptPayments: 'Accept payments',
    trial: 'Start 7 Day Trial',
    pay: 'Pay {{amount}}',
    savedPaymentMethod: 'Saved Payment Methods',
    addPaymentMethod: 'Add Payment Method',
    renew: 'Renew subscription',
    details: 'Subscription details',
    providerKey: 'Provider key',
    paymentMethod: 'Payment method',
    subscriptionLength: 'Subscription length',
    subscriptionType: 'Subscription Type',
    expiration: 'Expiration',
    nextPayment: 'Next payment',
    lastPayment: 'Last payment',
    cancelDate: 'Cancellation Date',
    expireDate: 'Expiration date',
    perMonth: 'Price per month',
    cancel: 'Cancel subscription',
    upgrade: 'Upgrade Subscription',
    left: '{{count}} day left',
    left_plural: '{{count}} days left',
    paused: 'Your subscription is paused. Please talk to customer support.',
    error:
      'Your subscription has expired. Please set up a new subscription if you want to use your Alpha Pro account.',
    platformMismatch:
      'Your subscription was executed via the {{platform}} mobile app. Please go to the {{platform}} app settings if you want to manage the subscription.',
    platformMismatchWeb:
      'Your subscription was executed via the Web. Please go to the Web app settings if you want to manage the subscription.',
    platformMismatchAdmin:
      'Your subscription was executed by the admin of AlphaPro. Please go to the Web app settings or contact admin if you want to manage the subscription.',
    webSubscriptionAlert:
      'Your subscription was executed via the web app. You can not sign in mobile app with web subscription.',
  },
  services: {
    title: 'Services you offer',
    description: 'Add your services and details',
    skip: 'Skip',
    continue: 'Continue',
    save: 'Save',
    addService: 'Add a Service',
    newService: 'New Service',
    physicalItem: 'This is a physical item being sold',
    serviceName: 'Service name',
    itemName: 'Item name',
    serviceDescription: 'Service description',
    itemDescription: 'Item description',
    price: '*Price',
    quickSale: 'Quick Sale Option',
    active: 'Active',
    estimatedTime: 'Estimated time of service(minutes)...',
  },
  onlinePaymentSettings: {
    title: 'Online Payments Settings',
    description:
      'Would you like to receive payments from your clients for completed services through the App? You’ll also be able to set up this option later in your settings',
    switchTitle: 'Enable Online Payments option',
    continue: 'Continue',
  },
  addPaymentMethodSetup: {
    title: 'Please set up your payment methods',
    description: 'Tap the Add New Card button to Add New Payment Card',
    addPaymentMethodButton: 'Add New Card',
    addPaymentMethod: 'Add Payment Method',
    editPaymentMethod: 'Edit Payment Method',
    cardHolderName: "Card Holder's Name",
    makeDefault: 'Make Default',
    addCard: 'Add',
    editCard: 'Save',
    continue: 'Continue',
    errors: {
      uniqCard: 'This card is already set to default',
    },
  },
  chooseNeeds: {
    title: 'Tell us about your needs',
    description:
      'What kind of service providers are you interested in connecting with and receiving promotions from?',
    selected: 'Selected',
    continue: 'Continue',
  },
  addCategory: {
    newInvoice: 'New Invoice',
    newTask: 'New Task',
    newClient: 'New Client',
    newSale: 'New Sale',
    newAppointment: 'New Appointment',
  },
  resetPassword: {
    title: 'Reset password',
    description:
      'Your new password must be different from previous used password',
    currentPassword: 'Current password',
    confirmPassword: 'Confirm new password',
    confirmField: 'Confirm new password...',
    newPassword: 'New password',
    newField: 'New password...',
    button: 'Update password',
  },
  createPassword: {
    title: 'Create password',
    description:
      'Your account does not have a password as it was created using a social network account. Please create a password to be able to log in to the app using email.',
    password: 'Password',
    passwordField: 'Password...',
    confirmPassword: 'Confirm password',
    button: 'Create password',
  },
  more: {
    invoices: 'Invoices',
    estimates: 'Estimates',
    clients: 'Clients',
    expenses: 'Expenses',
    tasklist: 'Tasklist',
    cash: 'Cash Journals',
    payments: 'Payments',
    vendors: 'Vendors',
    clientConnect: 'Client Connect',
    howDoI: 'How do I?',
    checkout: 'Checkout',
  },
  clientDetails: {
    firstName: 'First name',
    lastName: 'Last name',
    mobile: 'Mobile',
    email: 'Email',
    notes: 'Notes',
    invoice: 'Send invoice to client',
    notifications: 'Client want notification',
    active: 'Active client',
    clientAddress: 'Client Address',
    additionalAddress: 'Additional address details',
    moreDetails: 'More Details',
    birthday: 'Birthday',
    otherNumber: 'Whatsapp/other number',
    preference: 'Preference for notifications',
    button: 'Save Client Details',
    warning: 'Please add client email or phone number to enable this option.',
    details: 'Client Details',
  },
  settings: {
    links: {
      profile: 'Profile',
      setupHomepage: 'Setup Homepage',
      taxesSettings: 'Tax settings',
      servicesOffered: 'Services offered',
      package: 'Appointment packages',
      paymentMethods: 'Payment methods',
      expenseType: 'Expense types',
      salesSpecial: 'Sales Special',
      configureHomepage: 'Configure Homepage',
      closedDays: 'Closed Days',
      calendarSetup: 'Calendar setup',
      loyaltyOptions: 'Loyalty options',
      notifications: 'Notifications',
      socialMedia: 'Social media',
      subscription: 'Subscription',
      clientConnection: 'Client Connection',
      invoiceNotes: 'Invoice & Estimate Notes/Terms',
      reminders: 'Reminders',
      bottomMenu: 'Personalize',
      onlinePayments: 'Online Payment Methods',
      blackList: 'Blacklist',
      deleteAccount: 'Delete Account',
      shareToClients: 'Share with your clients',
      recommendAlpha: 'Recommend Alpha Pro',
    },
    deleteAccount: {
      title: 'Account Deletion',
    },
    socialMediaTitle: {
      twitter: 'Twitter',
      facebook: 'Facebook',
      instagram: 'Instagram',
    },
    socialNotice: {
      facebook:
        '\u2022 For Facebook integration you must have atleast one facebook page assosiated with your facebook user account so that you can share your sale special offers on your fb page to reach on more clients.',
      instagram:
        '\u2022 For Instagram integration you must have an Instagram business account which needs to be linked with a facebook page.',
    },
    socialDescription: {
      facebook:
        'For Facebook integration your facebook account must have atleast one facebook page connected to your account.',
      instagram:
        'For Instagram integration you must have an instagram business account and it needs to be connected to your facebook page.',
    },
    bottomMenu: {
      description:
        'Here you can change the bottom menu item shown between the `Plus` and `More` buttons',
      label: 'Select menu item that shall be shown',
      changed: 'Bottom menu settings successfully changed',
    },
  },
  calendarSetup: {
    timeBetweenAppointments: {
      label: '{{amount}} mins',
      inputLabel: 'Time between appointments: {{amount}} mins',
    },
    sendConfirmation: 'Send appointment confirmations to clients',
    daysOpenWeekly: 'Days open weekly',
    allowDoubleBooking: 'Allow double booking',
    remindClient: {
      label: {
        minutes: '{{amount}} minutes before',
        hours: '{{amount}} hours before',
        day: '{{amount}} day before',
      },
      inputLabel: {
        minutes: 'Remind Client: {{amount}} minutes before',
        hours: 'Remind Client: {{amount}} hours before',
        day: 'Remind Client: {{amount}} day before',
      },
    },
    dayStart: 'Day start',
    dayEnd: 'Day end',
    lunchStart: 'Lunch start',
    lunchEnd: 'Lunch end',
    changedApplied: 'Calendar edits has been successfully applied',
  },
  reminders: {
    add: 'Add Reminder',
    reminderSetting: 'Reminder Setting',
    remindMe: 'Remind me if I forget to log my',
    sendReminder: 'Send the reminder',
    entity: {
      sales: 'Sales inactivity',
      invoices: 'Invoices inactivity',
      expenses: 'Expenses inactivity',
    },
    missDay: 'If I miss a day',
    missDays: 'If I miss {{count}} days',
    fields: {
      entity: 'Reminder type',
      reminderTime: 'Inactivity period',
    },
    day: '{{count}} day',
    day_plural: '{{count}} days',
    errors: {
      uniq: 'You already have this reminder',
    },
  },
  closedDays: {
    addDays: 'Add Closed Days',
    edit: 'Edit closed days',
    fromDate: 'Date to close',
    toDate: 'End Date',
    multipleDays: 'Extend for multiple days',
    reason: {
      label: {
        holiday: 'Holiday',
        vacation: 'Vacation',
        other: 'Other',
      },
      inputLabel: {
        holiday: 'Reason: Holiday',
        vacation: 'Reason: Vacation',
        other: 'Reason: Other',
      },
    },
    fields: {
      description: 'Description',
    },
    sendNotifications: 'Send notifications to active clients',
    saveWarningMessage:
      'This change might result in the cancellation of one or more appointments, continue?',
    createSuccess: 'New Closed days has been successfully created',
    editSuccess:
      'Changes applied to the Closed days has been successfully saved',
    deleteSuccess: 'Closed days has been successfully deleted',
  },
  products: {
    price: 'Price ',
    addService: 'Add Service',
    newService: 'New Service',
    editService: 'Edit Service',
    physicalItem: 'This is a physical item being sold',
    quickSale: 'Quick Sale Option',
    placeholders: {
      name: {
        service: 'Service name',
        item: 'Item name',
      },
      description: {
        service: 'Service description',
        item: 'Item description',
      },
      price: 'Price',
      time: 'Estimated time of service (minutes)',
    },
    errors: {
      uniqService: 'You already have a service with this name',
      uniqItem: 'You already have a product with this name',
    },
    fields: {
      name: 'Name',
      description: 'Description',
      price: 'Price',
      time: 'Estimated time of service (minutes)',
    },
    active: 'Active',
    saleBadge: 'Sale {{salePrice}}',
  },
  packages: {
    price: 'Price ',
    addPackage: 'Add Package',
    editPackage: 'Edit Package',
  },
  taxes: {
    addTax: 'Add Tax',
    editTax: 'Edit Tax',
    active: 'Active',
    notActive: 'Not Active',
    rate: 'Current rate ',
    history: 'View rate history',
    historyTitle: 'Rate history',
    dates: 'Dates',
    effectiveDate: 'Effective Date',
    note: 'Note',
    editNote:
      'You updated the Tax rate, the Effective date was automatically set to the current date',
    cancelNote: 'If you leave before saving, your changes will be lost',
    deleteSuccess: 'Tax has been successfully deleted',
    placeholders: {
      name: '*Tax Short name',
      description: 'Tax Description',
      rate: '*Tax rate',
      date: 'Effective date',
    },
    fields: {
      name: 'Tax Short name',
      rate: 'Rate',
      rateRange:
        'Rate must not be less than 0.01 and not be greater than 99.99',
    },
    applyTaxRate: 'Apply Tax Rate to Transactions',
    historicalRate: 'Historical rates',
    save: 'Save changes',
  },
  loyaltyOptionsLinks: {
    clientReward: 'Client reward',
    clientBirthdayReward: 'Client Birthday Reward',
    clientLoyaltyReward: 'Client Loyalty Reward',
    editBirthdayReward: 'Edit birthday reward',
    editLoyaltyReward: 'Edit loyalty reward',
  },
  clientBirthdayReward: {
    placeholders: {
      active: 'Active Reward',
      description: '*Description',
      moreDescription: '*More details about reward',
      rewardType: '*Reward type',
      rewardFor: '*Reward for',
      discountAmount: '*Discount Amount eg. $5',
      discountRate: '*Discount Percent',
      onlyOnBirthday: 'Only available on birthday',
      noCombination: 'No combination',
    },
    fields: {
      description: 'Description',
      moreDescription: 'More details about reward',
      rewardType: 'Reward type',
      rewardFor: 'Reward for',
      services: 'Service',
      sItems: 'Product',
      discountAmount: 'Discount Amount',
      discountRate: 'Discount Percent',
      discountAmountRange:
        'Discount amount must not be less than 0.01 and not be greater than product price {{minPrice}}',
      discountRateRange:
        'Discount percent must not be less than 0.01 and not be greater than 99.99',
    },
    errors: {
      lessDescription:
        'birthday description should not be less than 3 characters.',
      lessMoreDescription:
        'details field should not be less than 3 characters.',
    },
    changedApplied: 'Birthday reward edits has been successfully applied',
  },
  clientLoyaltyReward: {
    placeholders: {
      active: 'Active Reward',
      description: '*Description',
      rewardReason: '*Reward Reason',
      rewardAfterSpending: '*Reward after spending',
      rewardAfterCompleting: '*Reward after completing',
      rewardType: '*Reward type',
      rewardFor: '*Reward for',
      discountAmount: '*Discount Amount eg. $5',
      discountRate: '*Discount Percent',
      cannotUseWithOtherSpecial: 'Cannot use with other special',
      dayRestriction: 'Day Restriction',
    },
    fields: {
      description: 'Description',
      rewardReason: 'Reward Reason',
      rewardType: 'Reward type',
      rewardFor: 'Reward for',
      services: 'Service',
      sItems: 'Product',
      discountAmount: 'Discount Amount',
      discountAmountRange:
        'Discount amount must not be less than 0.01 and not be greater than product price {{minPrice}}',
      discountRate: 'Discount Percent',
      discountRateRange:
        'Discount percent must not be less than 0.01 and not be greater than 99.99',
      rewardAfterSpending: 'Reward after spending',
      rewardAfterSpendingRange:
        'Reward after spending must not be less than 0.01',
      rewardAfterCompleting: 'Reward after completing',
      rewardAfterCompletingRange:
        'Reward after completing must not be less than 1 and must be a valid number',
    },
    changedApplied: 'Loyalty reward edits has been successfully applied',
  },
  salesSpecial: {
    addSalesSpecial: 'Add Sales Special',
    editSalesSpecial: 'Edit Sales Special',
    active: 'Active',
    notActive: 'Not Active',
    service: 'Service ',
    price: 'Special price ',
    placeholders: {
      sale: '*Sale',
      service: '*Service',
      salePrice: '*Sale Price',
      price: '*Price',
      saleDescription: '*Sale Description',
      todayOnly: 'Today Only',
      timeRestriction: 'Time Restriction',
      timeRestrictionStart: 'Start',
      timeRestrictionEnd: 'End',
      dateRestriction: 'Date Restriction',
      dateRestrictionStart: 'Start',
      dateRestrictionEnd: 'End',
      dayRestriction: 'Day Restriction',
      existingClientsOnly: 'Existing Clients Only',
      noCombination: 'No Combination',
      sendOfferToClientApp: 'Send sales special offer to client app',
      sendOfferToSocialMediaPages: 'Send to social media pages',
      active: 'Active',
    },
    fields: {
      sale: 'Sale',
      service: 'Service',
      saleDescription: 'Sale Description',
      salePrice: 'Sale Price',
      price: 'Price',
      days: 'Day',
      salePriceRange:
        'Sale Price must be more than 0 and less than original price',
      lessEndTime:
        'The end time cannot be less than the start time of the time restriction.',
      lessStartDate:
        'The start date cannot be in past of the date restriction.',
      deactivatedService: '{{serviceName}} is deactivated',
      dateTimeRestrictionRequired:
        'Please specify the date and time restriction for the sale special.',
      dateDayRestrictionRequired:
        'Please specify the date or day restriction for the sale special.',
      pastTime: 'The start time cannot be in past.',
    },
    deleteSuccess: 'Sales Special has been successfully deleted',
    save: 'Save',
    note: 'Note',
    cancelNote: 'If you leave before saving, your changes will be lost',
    errors: {
      socialMediaError:
        "Unfortunately you cannot share this sale special to social media. Please enable atlease one social media in settings to share on social media pages or uncheck the box 'Send to social media' to proceed next.",
    },
    notEligible:
      'Sale special offer is not applicable because appointment time does not meet the sale special availability criteria. If you still want to book this appointment with sale special offer, please talk to service provider or add a note in appointment.',
    timeNotSelected:
      'Sale special offer is not applicable because time is not selected. Please select a time slot.',
  },
  clientSalesSpecialDetails: {
    header: 'Special Details',
    existingClientsOnly: 'Existing Clients Only',
    noCombination: 'No Combination',
  },
  paymentMethods: {
    addMethod: 'Add Payment Method',
    newPaymentMethod: 'New Payment Method',
    editPaymentMethod: 'Edit Payment Method',
    fields: {
      active: 'Active',
      shortName: 'Short name',
      description: 'Description',
    },
    placeholders: {
      shortName: 'Short name*',
      description: 'Description*',
    },
    errors: {
      uniq: 'You already have an existing payment method with the name {{shortName}}. Please choose another name.',
      noConnectAccount:
        'You should create connect account if you want to use the Online payments option',
    },
  },
  onlinePaymentMethods: {
    addMethod: 'Add New Card',
    deleteAllCards: 'Are you sure you want to delete all your cards',
    enableOnlinePayment:
      'Are you sure you want to enable the online payment method',
    disableOnlinePayment:
      'Are you sure you want to disable the online payment method',
  },
  notificationSettings: {
    header: 'Notification Settings',
    email: 'Email notifications',
    push: 'Push notifications',
    sms: 'SMS notifications',
    chatMessages: 'Chat messages',
    appointmentNewRequests: 'Appointment new requests',
    appointmentChangeRequest: 'Appointment change requests',
    appointmentChange: 'Appointment change',
    appointmentReminder: 'Appointment reminder',
    appointmentConfirmation: 'Appointment confirmation',
    appointmentCancellation: 'Appointment cancellation',
    appointmentInvitation: 'Appointment invitation',
    newInvoice: 'New invoice',
    newReceipt: 'New receipt',
    closedDayNotification: 'Closed day notification',
    closedDaysReminder: 'Closed days reminder',
    requestExpiredReminder: 'Request expired reminder',
    clientCheckedIn: 'Client Checked in',
    inactivityReminder: 'Inactivity reminder',
    taskReminder: 'Task reminder',
    specialExpired: 'Sale special expiration notification',
    birthdayRewardNotification: 'Client received birthday rewards',
    loyaltyRewardNotification: 'Client received loyalty rewards',
    saleSpecialNotification: 'Sale Special Notification',
    loyaltyBirthdayNotification: 'Loyalty Birthday Notification',
    rewardLoyaltyNotification: 'Loyalty Reward Notification',
    paymentSuccessRequestNotification: 'Payment Success Request Notification',
    onlinePaymentRequestNotification: 'Online payment request notification',
    paymentReceivedRequestNotification: 'Payment Received Request Notification',
    paymentRefundRequestNotification: 'Payment Refund Request Notification',
    paymentAcceptRequestNotification: 'Payment Request Accept Notification',
    paymentRejectedRequestNotification:
      'Payment Request Rejection Notification',
    reminderTime: {
      label: {
        minutes: '{{count}} minutes before',
        hour: '{{count}} hour before',
        hour_plural: '{{count}} hours before',
        day: '{{count}} day before',
      },
    },
    appointmentReminderTime: 'Appointment reminder time',
    alerts: {
      save: 'Please note, you disabled all notifications channels, you won’t be able to receive any app notifications.',
    },
    messages: {
      save: 'Notifications settings have been successfully applied',
    },
  },
  tasks: {
    header: 'My Tasks',
    addTasks: 'Add Tasks',
    addTask: 'Add a Task',
    sections: {
      today: 'Your tasks to complete by today',
      thisWeek: 'This Week',
    },
    date: 'Due: {{date}}',
    time: ' | At: {{time}}',
    today: 'Today',
    notes: 'Notes: {{description}}',
    details: 'Task Details',
    dateDue: 'Date due',
    timeDue: 'Time due',
    alertMe: 'Alert me',
    repeatTask: 'Repeat Task',
    repeatDetails: 'Repeat details',
    edit: 'Edit Task',
    remindMe: {
      label: {
        noRemind: 'Don’t remind me',
        minutes: '{{amount}} minutes before',
        hour: '{{amount}} hour before',
        hours: '{{amount}} hours before',
        day: '{{amount}} day before',
      },
      inputLabel: {
        noRemind: 'Remind me: Don’t remind me',
        minutes: 'Remind me: {{amount}} minutes before',
        hour: 'Remind me: {{amount}} hour before',
        hours: 'Remind me: {{amount}} hours before',
        day: 'Remind me: {{amount}} day before',
      },
    },
    fields: {
      name: 'Name',
      description: 'Description',
      repeat: 'Repeat this task',
      search: 'Keyword',
      date: 'Due date',
      time: 'Due time',
    },
    save: 'Save Task Details',
    repeatHeader: 'Setup task to repeat',
    everyday: 'Everyday',
    everyWeek: 'Every week on ',
    everyMonth: 'Every month on ',
    every: 'Every ',
    on: ' on ',
    weekly: 'Weekly on the following days',
    day: 'day {{day}}',
    lastDay: 'Last day',
    review: 'Review',
    taskDetailsReview: 'Task Details Review',
    tasksThisWeek: 'Tasks this week',
    tasksThisMonth: 'Tasks this month',
    editTaskSettings: 'Edit task setting',
    repeat: {
      everyday: 'Task will be repeated everyday',
      everyWeekday: 'Task will be repeated on every {{day}}',
      everyMonth: 'Task will be repeated every month on {{date}}',
      everyYear: 'Task will be repeated every {{month}} on {{date}}',
      everyWeek: 'Task will be repeated weekly on {{days}}',
    },
    errors: {
      noWeekdays: 'You should select at least one week day',
      lastDates: 'Note, not all months have the 29/30/31th date',
      lastFebruary: 'Note, not all Februaries have the 29th date',
      time: 'You cannot create a not repeated task with the past time. Please select a future time.',
      timezoneError:
        'In order to create tasks you will need to update the address field in your profile section.',
    },
    deleteMessage:
      'You’re deleting a repeated task that is scheduled for multiple days. Are you sure you want to totally delete the task with all its samples?',
    searchTasks: 'Search Tasks',
    search: 'Search',
    resetSearch: 'Reset search',
    startDate: 'Start date',
    endDate: 'End date',
    placeholder: {
      header: 'Track your tasks',
      description:
        'Take control of your day and schedule tasks and activities to help you run your business.',
    },
  },
  invoiceNotes: {
    title: 'Set up Notes/Terms content',
    subtitle:
      'Here you can set up the content of the Notes/Terms field that will be shown in all your invoice & estimate PDF files by default. You can change this text for every invoice and estimate individually.',
    fields: {
      notes: 'Notes/Terms',
    },
    successMessage: 'The new Notes/Terms text has been successfully saved',
  },
  providers: {
    myProviders: 'My Providers',
    addProvider: 'Add Provider',
    standardHours: 'Standard hours ',
    currentlyClosed: 'Currently Closed',
    getDirection: 'Get direction',
    tabs: {
      details: 'Details',
      appointments: 'Appointments',
      deals: 'Deals',
      invoices: 'Invoices',
      estimates: 'Estimates',
      sales: 'Sales',
      payments: 'Payments',
    },
    addressNotProvided: "Provider's address is not provided",
    salesSpecialDiscount: 'Sales special',
    basicInfo: 'Basic Info',
    servicesOffered: 'Services offered',
    followUs: 'Follow Us',
    websites: 'Websites/Links',
    category: 'Category',
    businessDetails: 'Business Details',
    currentlyOpened: 'Currently Opened',
    shopName: 'Shop/Business Name',
    serviceAtClientsLocation: "Service at client's location available",
    serviceOffer: '{{offer}}% off on services',
    houseCall: 'House call',
    ableToProvideServices: 'Able to provide services at client’s location',
    unableToProvideServices: 'Unable to provide services at client’s location',
    workingHours: 'Working hours',
    lastAppointment: 'Last Appointment',
    upcomingAppointment: 'Upcoming Appointment',
    getProviderFailure: 'Failed to fetch provider data',
    bookAppointment: 'Book Appointment',
    time: '{{count}} minute',
    time_plural: '{{count}} minutes',
    appointments: {
      withProduct: '{{product}} at {{date}}',
      withoutProduct: 'at {{date}}',
    },
    payments: {
      total: 'Payment total',
      id: 'Receipt No.',
      date: 'Payment Date',
    },
    unshortlistWarning: 'Are you sure you want to remove this Provider?',
    unshortlist: 'Provider has been successfully removed from the shortlist!',
    filters: 'Filters',
    placeholder: {
      header: 'Provider details',
      description:
        'Review your providers details, find new providers, schedule appointments directly and view the details of activities with the provider',
    },
  },
  search: {
    selectYourLocation: 'Select your location',
    searchForLocation: 'Search for your location...',
    useCurrentLocation: 'Use my current location',
    locationBlocked:
      'Unfortunately, the app cannot define your location. Please check your device location settings',
    openSettings: 'Go to settings',
    notNow: 'Not now',
    clearHistory: 'Clear search history',
    placeholder: 'Search for providers and specials...',
    tabs: {
      providers: 'Service Provider',
      specials: 'Specials/Discounts',
    },
    resultsCount: '{{count}} results',
    noResults: 'No providers found near you that match your request',
    noSaleResults: 'No sales specials found near you that match your request',
    hint: 'Please type a text in the search bar to start searching providers. You can also set up the Provider Titles filter to refine the search.',
  },
  error: {
    somethingWentWrong: 'Something went wrong',
    tryAgain: 'Try again',
  },
  dashboard: {
    locationBlocked:
      'You denied AlphaPro access to the device location, so we cannot change your in-app time-zone automatically. If you want to switch your in-app timezone to the current actual time zone you can do it manually by changing your address in the AlphaPro settings.',
    timezoneChanged:
      'We noticed that your actual time zone has changed. Would you like to switch your in-app timezone and address to the current actual timezone?',
    timezoneUpdated:
      'Your in-app active time zone and address has been changed.',
    deniedPermission:
      'Without access to the device location, we cannot update your default country code and address. Please manually select the country code for your mobile number.',
    userLocationDenied:
      'We do not have permission to use your location, this feature is therefore not available.',
  },
  common: {
    ok: 'OK',
    warning: 'Warning',
    continue: 'Continue',
    save: 'Save',
    saveDetailsButton: 'Save {{name}} Details',
    saveChanges: 'Save Changes',
    share: 'Social Share',
    cancel: 'Cancel',
    delete: 'Delete',
    block: 'Block',
    remove: 'Remove',
    confirm: 'Confirm',
    review: 'Review',
    yes: 'Yes',
    no: 'No',
    email: 'Email',
    whatsApp: 'WhatsApp',
    address: 'Address',
    maxDiscount: 'Max Discount',
    workSmarter: 'Work Smarter',
    search: 'Search',
    keyword: 'Keyword...',
    resetSearch: 'Reset Search',
    NA: 'N/A',
    today: 'Today',
    thisWeek: 'This week',
    thisMonth: 'This month',
    year: 'This year',
    lastYear: 'Last year',
    earlier: 'Earlier',
    logout: 'Logout',
    send: 'Send',
    home: 'home',
    calendar: 'calendar',
    more: 'more',
    is: 'is',
    was: 'was',
    on: 'on',
    time: {
      hour: '{{count}} hour',
      hour_plural: '{{count}} hours',
      min: '{{count}} min',
      min_plural: '{{count}} mins',
    },
    entities: {
      provider: 'Provider',
      setupProfile: 'Complete your profile',
      providers: 'Providers',
      closedDays: 'Closed days',
      client: 'client',
      clients: 'clients',
      services: 'services',
      service: 'service',
      taxes: 'taxes',
      salesSpecial: 'Sales Special',
      quickPromotion: 'Quick Promotion',
      salesSpecialDetails: 'Sales Special Details',
      tax: 'tax',
      vendor: 'vendor',
      paymentMethods: 'payment methods',
      paymentMethod: 'payment method',
      tasks: 'tasks',
      task: 'task',
      appointments: 'appointments',
      appointment: 'appointment',
      invoice: 'invoice',
      invoices: 'invoices',
      estimate: 'estimate',
      estimates: 'estimates',
      invoicePayments: 'payments associated with this invoice',
      sale: 'sale',
      sales: 'sales',
      saleCheckout: 'checkout',
      saleReceipt: 'sale receipt',
      payment: 'payment',
      payments: 'payments',
      deals: 'deals',
      expense: 'expense',
      expenses: 'expenses',
      expenseType: 'expense type',
      chats: 'chats',
      chat: 'chat',
      checkout: 'sale checkout',
      cashJournal: 'cash journal',
      cashJournals: 'cash journals',
      message: 'message',
      notifications: 'notifications',
      reminder: 'reminder',
      reminders: 'reminders',
      calendarSettings: 'calendar settings',
      clientBirthdayReward: 'client birthday reward',
      clientLoyaltyReward: 'client loyalty reward',
      document: 'document',
      card: 'card',
      cards: 'all cards',
    },
    profileSetupSteps: {
      info: 'Personal Info',
      business: 'Business Details',
      services: 'Services you offer',
      paymentSetup: 'Online payments[Premium]',
      social: 'Social media [Premium]',
      description:
        'In order to be listed as an Alpha, so that clients can search for your profile and find you in the client app and request an appointment directly, you must complete the first 3 sections of your profile.',
    },
    processes: {
      create: 'create',
      edit: 'edit',
      delete: 'delete',
      read: 'read',
      share: 'share',
    },
    alerts: {
      creation: 'Please confirm creation of new {{entity}}',
      editing: 'Please confirm saving {{entity}} edits',
      blockClient:
        'Are you sure you want to block {{entity}}? Please note, you won’t be able to receive new messages from this client and your chat history with this client will be deleted.',
      blockProvider:
        'Are you sure you want to block {{entity}}? Please note, you won’t be able to receive new messages from this provider and your chat history with this provider will be deleted.',
      deletion: 'Are you sure you want to delete this {{entity}}?',
      sending:
        'Are you sure you want to send this {{entity}} to the {{recipient}}?',
      comingSoon: 'Coming soon',
      connectClient:
        'Are you sure you want to connect {{clientName}}? Note, all your existing Appointments, Sales and Invoices that you have created for this client profile will become available for {{clientName}}',
      disconnectClient:
        'Are you sure you want to disconnect {{clientName}}? Note, all your existing Appointments, Sales, Invoices and Payments that you have created for this client profile will become unavailable for {{clientName}}.',
      mobileWarning: 'Add mobile number and try again',
      leaveAlert:
        'Are you sure that you want to leave? If you leave before saving, your progress will be lost',
      subscription:
        'You may purchase an auto-renewing subscription through an In-App Purchase. \n\n• Alpha Pro Premium subscription ($29.99) duration (1 month). \n\n• Alpha Pro Standard subscription ($19.99) duration (1 month). \n\n• Alpha Pro Lite subscription ($9.99) duration (1 month). \n\n• Your subscription will be charged to your iTunes account at confirmation of purchase and will automatically renew (at the duration selected) unless auto-renew is turned off at least 24 hours before the end of the current period. \n\n• Current subscription may not be cancelled during the active subscription period; however, you can manage your subscription and/or turn off auto-renewal by visiting your iTunes Account Settings after purchase.\n',
    },
    messages: {
      addition: 'New {{entity}} has been successfully added!',
      creation: 'New {{entity}} has been successfully created!',
      block:
        '{{entity}} has been successfully blocked, however you can always unblock the {{entity2}} from the Chat blacklist menu in the app settings',
      blockProvider:
        'provider has been successfully blocked, however you can always unblock the provider from the Chat blacklist menu in the app settings',
      unblock: '',
      edition: '{{entity, capitalize}} edits have been successfully saved!',
      deletion: '{{entity, capitalize}} has been successfully deleted!',
      sharing: '{{entity, capitalize}} has been successfully sent',
      notification:
        'You did not specify any contact information for the client. The client won’t be able to receive notifications.',
    },
    errors: {
      load: '',
      action:
        'The procedure cannot be completed due to technical issues. Please check your internet connection and try again.',
      process:
        'Unfortunately, the app failed to {{process}} the {{entity}} due to temporary technical issues. Please try again later.',
      required: '{{field}} is a required field',
      wrongFormat: 'Please enter a valid {{field}}',
      emailfield: '{{field}} is not valid',
      maxLength:
        'Max length of the {{field}} field should be {{length}} symbols',
      minLength:
        'Min length of the {{field}} field should be {{length}} symbols',
      forbiddenSymbols: '{{field}} shall not contain forbidden symbols',
      zero: '{{field}} cannot be 0',
      passwordFormat:
        'Please enter a valid password. Password must include 1 uppercase character, 1 lowercase character, 1 digit and must consist of 8-32 characters in total',
      deletePayment:
        'You cannot delete this payment record as it’s associated with an existing Sale. You still can delete it by disabling the Payment received option on the respective Sale details screen',
      unselected: 'Please select at least one {{field}}',
      unavailable: 'No {{field}} is available',
      timezoneErrorBday:
        'In order to add birthday details for a client first you will need to update the address and timezone in profile section.',
    },
    fields: {
      keyword: 'Keyword',
      startDate: 'Start date',
      endDate: 'End date',
    },
    placeholders: {
      list: {
        default: 'You don’t have any {{entities}}',
        date: 'You don’t have any {{entities}} for the selected date',
        short: 'No {{entities}} for the selected date',
        week: 'You don’t have any {{entities}} for the selected week',
        month: 'You don’t have any {{entities}} for the selected month',
        year: 'You don’t have any {{entities}} for the selected year',
        deleted:
          'This {{entities}} is not available anymore as it has been deleted',
      },
    },
    files: {
      pdf: {
        invoice: 'Invoice_#{{number}}_{{date}}_{{firstName}}_{{lastName}}',
        estimate: 'Estimate#{{number}}_{{date}}_{{firstName}}_{{lastName}}',
        receipt: 'Receipt_#{{number}}_{{date}}_{{firstName}}_{{lastName}}',
        transactionListing:
          'Transaction_Listing_#{{name}}_{{type}}_{{fromDate}}_{{toDate}}',
        transactionSummary:
          'Transaction_Summary_#{{name}}_{{type}}_{{fromDate}}_{{toDate}}',
      },
      image: 'Image#{{number}}',
    },
    days: {
      saturday: 'Saturday',
      sat: 'Sat',
      sunday: 'Sunday',
      sun: 'Sun',
      monday: 'Monday',
      mon: 'Mon',
      tuesday: 'Tuesday',
      tue: 'Tue',
      wednesday: 'Wednesday',
      wed: 'Wed',
      thursday: 'Thursday',
      thu: 'Thu',
      friday: 'Friday',
      fri: 'Fri',
    },
    months: {
      january: 'January',
      jan: 'Jan',
      february: 'February',
      feb: 'Feb',
      march: 'March',
      mar: 'Mar',
      april: 'April',
      apr: 'Apr',
      may: 'May',
      june: 'June',
      jun: 'Jun',
      july: 'July',
      jul: 'Jul',
      august: 'August',
      aug: 'Aug',
      september: 'September',
      sep: 'Sep',
      october: 'October',
      oct: 'Oct',
      november: 'November',
      nov: 'Nov',
      december: 'December',
      dec: 'Dec',
    },
    labels: {
      noRemind: 'Don’t remind',
      cash: 'cash',
    },
  },
  appAppointments: {
    allAppointments: 'All appointments',
    backTitle: 'Appointment Details',
    backProviders: 'Provider Schedule',
    createNew: 'Create New Service',
    noName: 'No Name',
    warning: 'Warning',
    showDetails: 'Show more details ...',
    showMorePayments: 'Show more payment methods ...',
    hidePayments: 'Show less payment methods ...',
    hideDetails: 'Hide details ...',
    hide: 'Show less details ...',
    touchPNote:
      'Please create a new appointment if you want to choose another Provider',
    serviceNote:
      'Please note, after changing Activity you’ll need to select the appointment slot again.',
    selectService: 'Please select a service or item',
    selectActivity: 'Please select activity',
    selectPrice: 'Please select a service or item',
    selectQuantity: 'Please select a quantity sold',
    selectTimeSlot: 'Please choose timeslot',
    selectClient: 'Please select a client',
    notValidFirstName: 'First name is not valid',
    notValidLastName: 'Last name is not valid',
    noClientDetails: 'No client details',
    blockoutTitle: 'Blockout time appointment',
    blockoutAlert:
      'This Blockout time might result in the cancellation of one or more appointments, continue?',
    blockoutCondition:
      'It seems you are trying to block the timeslot. Please enable blockout time or select a service to create an appointment.',
    labelActivity: 'Service: select service ',
    activityField: 'Select service',
    slot: 'Appointment slot',
    activity: 'Service: ',
    chooseTimeSlot: 'Choose time slot',
    notes: 'Notes (max 1000 characters)',
    serviceTitle: 'Service details',
    service: 'Service',
    item: 'Item',
    moreServices: 'Add more services',
    allowBooking: 'Allow double booking',
    editSale: 'Edit Sale Item',
    deleteItem: 'Delete item',
    saveAppointment: 'Save Appointment Details',
    continue: 'Continue',
    confirm: 'Confirm',
    saleForEdit: 'Select item for sale',
    quantitySold: 'Quantity Sold',
    price: 'Price per item',
    newClient: 'New client',
    blockoutTime: 'Blockout time',
    repeatAppointment: 'Repeat appointment',
    repeatHeader: 'Setup appointment to repeat',
    checkedIn: 'Checked in',
    selectAClient: 'Select a client',
    firstName: '*First name',
    lastName: '*Last name',
    telephone: '*Telephone',
    quickSale: 'Quick Sale Option',
    addressNotProvided: "Provider's address is not provided",
    getDirection: 'Get direction',
    addForClient: 'Add Appointment for {{client}}',
    addAppointmentService: 'Add Appointment Service',
    editRepeatSettings: 'Edit appointment setting',
    editAppointmentService: 'Edit Appointment Service',
    everyday: 'Everyday',
    everyWeek: 'Every week on ',
    everyMonth: 'Every month on ',
    every: 'Every ',
    weekly: 'Weekly on the following days',
    endBy: 'End by: ',
    endAfter: 'End after {{count}} Appointments',
    repeat: {
      everyday: 'Appointment will be repeated everyday',
      everyWeekday: 'Appointment will be repeated on every {{day}}',
      everyMonth: 'Appointment will be repeated every month on {{date}}',
      everyYear: 'Appointment will be repeated every {{month}} on {{date}}',
      everyWeek: 'Appointment will be repeated weekly on {{days}}',
    },
    modal: {
      header: 'Your appointment has been requested',
      title: 'Your provider will need to confirm your request',
      service: 'Service',
      location: 'Location',
      date: 'Date and time',
      viewAppointment: 'View my appointment',
    },
    remindClient: {
      label: {
        minutes: '{{amount}} minutes before',
        hour: '{{amount}} hour before',
        hours: '{{amount}} hours before',
        day: '{{amount}} day before',
      },
      inputLabel: {
        minutes: 'Remind Client: {{amount}} minutes before',
        hour: 'Remind Client: {{amount}} hour before',
        hours: 'Remind Client: {{amount}} hours before',
        day: 'Remind Client: {{amount}} day before',
        noRemind: 'Remind Client: Don`t remind',
      },
    },
    remindMe: {
      label: {
        minutes: '{{amount}} minutes before',
        hour: '{{amount}} hour before',
        hours: '{{amount}} hours before',
        day: '{{amount}} day before',
      },
      inputLabel: {
        noRemind: 'Remind me: Don`t remind',
        minutes: 'Remind me: {{amount}} minutes before',
        hour: 'Remind me: {{amount}} hour before',
        hours: 'Remind me: {{amount}} hours before',
        day: 'Remind me: {{amount}} day before',
      },
    },
    errors: {
      timezoneError:
        'In order to book an appointment you will need to update the address and timezone field in your profile section.',
    },
  },
  createSale: {
    serviceName: 'Service name',
    backTitle: 'Sale Details',
    backProviders: 'Provider Schedule',
    createNew: 'Create New Service',
    noName: 'No Name',
    warning: 'Warning',
    touchPNote:
      'Please create a new appointment if you want to choose another Provider',
    serviceNote:
      'Please note, after changing Activity you’ll need to select the appointment slot again.',
    selectService: 'Please select a service or item',
    selectServiceOrQuickItem:
      'Please select at least 1 sale item in the Quick Items and Service Details sections',
    selectActivity: 'Please select activity',
    selectPrice: 'Please select a service or item',
    selectMethod: 'Please select a payment method',
    selectDate: 'Please select a sale date',
    selectEmail: 'Please put email receipt email',
    selectQuantity: 'Please select a quantity sold',
    selectTimeSlot: 'Please choose timeslot',
    selectClient: 'Please select a client',
    notValidFirstName: 'First name is not valid',
    notValidLastName: 'Last name is not valid',
    noClientDetails: 'No client details',
    blockoutTitle: 'Blockout time appointment',
    labelActivity: 'Activity: select activity',
    activityField: 'Activity',
    slot: 'Appointment slot',
    activity: 'Activity: ',
    chooseTimeSlot: 'Choose time slot',
    notes: 'Notes',
    serviceTitle: 'Service Details',
    packageTitle: 'Package Details',
    addPackage: 'Add package',
    paymentReceived: 'Payment received',
    quickItems: 'Quick Items',
    setUpTaxes: 'Set up Taxes',
    sendReceipt: 'Send receipt to the client',
    showPackages: 'Show package details',
    paymentMethod: 'Payment Method: ',
    saleDate: 'Sale date: ',
    service: 'Service',
    item: 'Item',
    moreServices: 'Add more services',
    allowBooking: 'Allow double booking',
    addSaleService: 'Add Sale Service',
    editSaleService: 'Edit Sale Service',
    editSale: 'Edit Sale Item',
    deleteItem: 'Delete item',
    saveSale: 'Save Sale Details',
    cancel: 'Cancel',
    continue: 'Continue',
    confirm: 'Confirm',
    decline: 'Decline',
    accept: 'Accept',
    apply: 'Apply',
    applyReward: 'Apply reward',
    noApplyReward: 'Do not apply',
    saleForEdit: 'Select item for sale',
    serviceForSale: 'Select service or item for sale',
    quantitySold: 'Quantity Sold',
    price: 'Price per item',
    newClient: 'New client',
    blockoutTime: 'Blockout time',
    checkedIn: 'Checked in',
    selectAClient: 'Select a client',
    firstName: '*First name',
    lastName: 'Last name',
    telephone: 'Telephone',
    quickSale: 'Quick Sale Option',
    preview: 'Preview receipt',
    remindClient: {
      label: {
        minutes: '{{amount}} minutes before',
        hour: '{{amount}} hour before',
        hours: '{{amount}} hours before',
        day: '{{amount}} day before',
      },
      inputLabel: {
        minutes: 'Remind Client: {{amount}} minutes before',
        hour: 'Remind Client: {{amount}} hour before',
        hours: 'Remind Client: {{amount}} hours before',
        day: 'Remind Client: {{amount}} day before',
      },
    },
    remindMe: {
      label: {
        minutes: '{{amount}} minutes before',
        hour: '{{amount}} hour before',
        hours: '{{amount}} hours before',
        day: '{{amount}} day before',
      },
      inputLabel: {
        minutes: 'Remind me: {{amount}} minutes before',
        hour: 'Remind me: {{amount}} hour before',
        hours: 'Remind me: {{amount}} hours before',
        day: 'Remind me: {{amount}} day before',
      },
    },
    error: {
      timezoneError:
        'In order to create a sale you will need to update the address field in your profile section.',
    },
  },
  saleCheckout: {
    backTitle: 'Sale Checkout',
  },
  pickTimeslot: {
    backTitle: 'Pick timeslot',
    client: 'Client: ',
    service: 'Service: ',
    blocked: 'Blocked',
    unavailable: 'Unavailable',
    picked: 'Picked',
    available: 'Available',
    addTimeslot: 'Add timeslot',
    sTimeslot: 'Select timeslot',
    sTemplate: 'Select a timeslot template',
    info: 'Info appointment',
    na: 'N/A',
    timeStart: 'Time start',
    timeEnd: 'Time end',
    confirm: 'Confirm',
    warning: 'Warning',
    cancel: 'Cancel',
    saveTimeslot: 'Save Timeslot',
    selectTimeslot: 'Please select a timeslot',
    placeholder: 'Provider is closed on this day',
    dayOff: 'Provider has a day off on this day',
    noTimeslots: 'Provider does not have available time slots for this day',
    pastNote: 'Please note, you selected a timeslot in the past.',
    lessEndNote:
      'The end time cannot be less than the start time of the time slot.',
  },
  calendar: {
    addAppointment: 'Add Appointment',
    appointmentsTitle: 'You have {{amount}} appointments today',
    nextAppointments: 'You have {{count}} appointment for {{date}}',
    nextUpcomingAppointments:
      'You have {{count}} more appointments for {{date}}',
    nextAppointments_plural: 'You have {{count}} appointments for {{date}}',
    previousAppointments: 'You had {{count}} appointment for {{date}}',
    noAppointments: 'No appointments for {{date}}',
    noMoreAppointments: 'No more appointments for {{date}}',
    previousAppointments_plural: 'You had {{count}} appointments for {{date}}',
    appointmentsTitleFound: 'We found {{amount}} search result',
    appointmentsTitleFilter: 'You have {{amount}} appointments this {{filter}}',
    blocked: 'Blocked',
    noData: 'No Data',
    noClient: 'No Client',
    date: 'Date ',
    confirmed: 'CONFIRMED',
    checkedIn: 'CHECKED IN',
    selectStart: 'Start date',
    selectEnd: 'End date',
    startTime: 'Start time',
    endTime: 'End time',
    clientName: 'Client Name',
    service: 'Service',
    serviceT: 'Service: ',
    keyword: 'Keyword: ',
    search: 'Search',
    customer: 'Customer: ',
    refine: 'Refine Search',
    weekBookingProgress: 'Week booking progress:',
    daysWithoutBooking: ' days without bookings this week',
    placeholder: {
      header: 'Manage your calendar',
      description:
        'View your schedule for the day and get a quick overview of your appointments.',
      bottomDescription: 'Manage and view your day hourly when you select',
    },
  },
  sales: {
    header: 'My Sales',
    details: 'Sale Details',
    receiptPreview: 'Receipt preview',
    lines: 'Sale Lines',
    noProducts: 'There is no information about the selected services',
    addButton: 'Add Sale',
    totalTitle: 'Sale total ',
    totalValue: '$ {{total}}',
    salesOrder: 'Sales order ',
    orderValue: '#{{value}}',
    date: 'Date ',
    discount: 'Discount',
    number: 'Sales no.',
    paymentReceived: 'Payment Received?',
    method: 'Payment Method ',
    slash: ' | ',
    paymentRequest:
      'Are you sure you want to send again the online payment request to this client ?',
    addClientSale: 'Add Sale for {{client}}',
    totalSalesValue: 'Total Sale Value',
    totalSales: 'Total Sales',
    status: {
      open: 'Open',
      paid: 'Paid',
      refunded: 'Refunded',
    },
    placeholder: {
      header: 'Track your sales',
      description:
        'Manage your sales to clients, quickly enter a sale and get an overview of your performance.',
    },
    pay: 'Pay',
    scan: 'Scan QR code',
  },
  salesReview: {
    header: 'Review',
    title: 'Sales Details Review',
    week: 'Sales this week',
    month: 'Sales this month',
    totalWeek: 'Number of sales this week',
    totalMonth: 'Number of sales this month',
    totalYear: 'Total value of sales this year',
    bottomTitle: 'Work Smarter',
  },
  salesSearch: {
    addAppointment: 'Add Appointment',
    appointmentsTitle: 'You have {{amount}} appointments today',
    appointmentsTitleFound: 'We found {{amount}} search result',
    appointmentsTitleFilter: 'You have {{amount}} appointments this {{filter}}',
    blocked: 'Blocked',
    noData: 'No Data',
    noClient: 'No Client',
    date: 'Date ',
    confirmed: 'CONFIRMED',
    selectStart: 'Start date',
    selectEnd: 'End date',
    clientName: 'Customer Name',
    service: 'Service',
    serviceT: 'Service: ',
    methodT: 'Method: ',
    keyword: 'Keyword: ',
    search: 'Search',
    customer: 'Customer: ',
    refine: 'Refine Search',
    paymentMethod: 'Payment Method',
  },
  payments: {
    header: 'My Payments',
    addButton: 'Add Payment',
    totalTitle: 'Payment total ',
    totalValue: '$ {{total}}',
    paymentNo: 'Payment No. ',
    noValue: '#{{value}}',
    paymentDate: 'Payment Date ',
    placeholder: {
      header: 'Manage your payments',
      description:
        'Use this to review all receipts, enter manual payments and send a payment receipt to a client.',
    },
    errors: {
      timezoneError:
        'In order to add payments you will need to update the address and timezone field in profile section.',
    },
    messages: {
      resendPaymentRequestSuccess:
        'Online payment request has been sent to this client successfully.',
    },
  },
  createPayment: {
    backTitle: 'Payment Details',
    newClient: 'New client',
    selectAClient: 'Select a client',
    firstName: '*First name',
    lastName: 'Last name',
    telephone: 'Telephone',
    preview: 'Preview receipt',
    paymentMethod: 'Payment Method: ',
    invoiceBalance: 'Invoice Balance ',
    receiptTotal: 'Payment Total',
    receiptDate: 'Receipt Date',
    invoiceDetails: 'Invoice details available',
    estimatesDetails: 'Estimate details available',
    invoice: 'Invoice #',
    estimate: 'Estimate #',
    selectInvoice: 'Select invoice ',
    selectEstimate: 'Select estimate ',
    reason: 'Reason for payment',
    notes: 'Notes',
    sendReceipt: 'Send receipt to the client',
    save: 'Save Payment Details',
    notValidFirstName: 'First name is not valid',
    notValidLastName: 'Last name is not valid',
    selectClient: 'Please select a client',
    selectMethod: 'Please select a payment method',
    selectInvoiceNote: 'Please select a invoice',
    selectEstimateNote: 'Please select a estimate',
    selectDate: 'Please select receipt date',
    selectEmail: 'Please put email receipt email',
    putTotal: 'Please put receipt total',
    noName: 'No Name',
  },
  paymentsReview: {
    header: 'Review',
    title: 'Payments Details Review',
    year: 'Payments this year',
    month: 'Payments this month',
    numberOfWeek: 'Number of payments this week',
    numberOfMonth: 'Number of payments this month',
    totalWeek: 'Total payments this week',
    bottomTitle: 'Work Smarter',
  },
  paymentsSearch: {
    addAppointment: 'Add Appointment',
    appointmentsTitle: 'You have {{amount}} appointments today',
    appointmentsTitleFound: 'We found {{amount}} search result',
    appointmentsTitleFilter: 'You have {{amount}} appointments this {{filter}}',
    blocked: 'Blocked',
    noData: 'No Data',
    noClient: 'No Client',
    date: 'Date ',
    confirmed: 'CONFIRMED',
    selectStart: 'Start date',
    selectEnd: 'End date',
    clientName: 'Customer Name',
    service: 'Service',
    serviceT: 'Service: ',
    methodT: 'Method: ',
    receiptT: 'Receipt No: ',
    keyword: 'Keyword: ',
    search: 'Search',
    customer: 'Customer: ',
    refine: 'Refine Search',
    paymentMethod: 'Payment Method',
    receiptNo: 'Receipt No.',
  },
  appointmentDetails: {
    addAppointment: 'Add Appointment',
  },
  invoices: {
    header: 'My invoices',
    add: 'Add Invoices',
    tabs: {
      open: 'Open',
      overdue: 'Overdue',
      month: 'This Month',
    },
    preview: 'Invoice preview',
    details: 'Invoice Details',
    includedPayment: 'Included Payment',
    invoiceBalance: 'Invoice Balance',
    date: 'Invoice date',
    dueDate: 'Invoice due date',
    fields: {
      newClient: 'New Client',
      firstName: 'First name',
      lastName: 'Last name',
      phoneNumber: 'Telephone',
      notes: 'Notes/Terms',
      comments: 'Comments',
      date: 'Date',
      dueDate: 'Due date',
      sendInvoice: 'Send invoice to the client',
      email: 'Email',
      quantity: 'Quantity Sold',
      description: 'Description',
      price: 'Price per item',
      quickSale: 'Quick Sale Option',
      product: 'Select a service or item',
      fullPayment: 'Add full / balance payment',
      partialPayment: 'Add partial payment',
      total: 'Payment amount received',
      paymentMethod: {
        searchPlaceholder: 'Expected Payment Method',
        placeholder: 'Select a payment method',
        label: 'Payment Method: {{method}}',
      },
      expectedPaymentMethod: {
        placeholder: 'Select an expected payment method',
        label: 'Payment Method: {{method}}',
      },
      clientName: 'Client Name',
    },
    previewInvoice: 'Preview invoice',
    selectClient: 'Select a client',
    save: 'Save Invoice Details',
    serviceDetails: 'Service Details',
    addService: 'Add more services',
    addInvoiceService: 'Add Invoice Service',
    editInvoiceService: 'Edit Invoice Service',
    service: 'Service',
    item: 'Item',
    createNewService: 'Create New Service',
    setupTaxes: 'Set up Taxes',
    subtotal: 'Subtotal ${{price}}',
    taxesLegend:
      'Taxes highlighted in grey cannot be selected as they don’t have a tax rate for the Invoice date',
    quickPayment: 'Quick Payment',
    invoiceQuickPayment: 'Invoice Quick Payment',
    addPhoto: 'Add Photo',
    chooseMethod: 'Choose method',
    chooseMethodMessage: 'Please choose a method',
    camera: 'Camera',
    library: 'Library',
    cancle: 'Cancel',
    errors: {
      clientRequired: 'Please select a client',
      productRequired: 'Please select a service or item',
      paymentMethodRequired: 'Please select a payment method',
      negativeBalance: 'Invoice balance cannot be negative!',
      maxImages:
        'Unfortunately, you cannot add more than 3 images per invoice.',
      notConnectedClient:
        'Online payment option can be enabled only if client is a connected client.',
      noOnlinePaymentEnabledClient:
        'Client may not have Online payment option enabled, please sync client details to get updated client info.',
      timezoneError:
        'In order to create invoices you will need to update the address field in your profile section.',
    },
    invoiceNumber: 'Invoice Number',
    balance: ' balance to be collected',
    total: {
      open: 'Total of all open invoices ',
      overdue: 'Total of all overdue invoices ',
      month: 'Total of this month invoices ',
    },
    editInvoice: 'Edit Invoice Details',
    paymentMethod: 'Payment Method',
    expectedPaymentMethod: 'Expected Payment Method',
    emailed: 'Emailed?',
    comments: 'Comments',
    addPayment: 'Add Payment',
    multiple: 'Multiple',
    invoiceStatus: 'Status',
    status: {
      paid: 'Paid',
      open: 'Open',
      overdue: 'Overdue',
    },
    invoiceTotal: 'Invoice Total',
    paymentsList: 'Payments list',
    paymentTotal: 'Payment total',
    paymentReceiptNumber: 'Receipt No.',
    paymentDate: 'Payment Date',
    invoice: 'Invoice',
    totalPayments: 'Total Payments',
    review: 'Review',
    invoiceDetailsReview: 'Invoice Details Review',
    invoiceThisYear: 'Invoice this year',
    invoiceThisMonth: 'Invoice this month',
    currentMonthCount: 'Number of new invoices this month',
    openCount: 'Number of open invoices',
    overdueCount: 'Number of overdue invoices',
    openBalanceTotal: 'Balance due on open invoices',
    overdueBalanceTotal: 'Value of overdue invoices',
    notesHint:
      'You can set up the default content of the invoice Notes/Terms field in your settings',
    searchInvoices: 'Search Invoices',
    resetSearch: 'Reset Search',
    allInvoices: 'All invoices',
    chips: {
      partiallyPaid: 'Partially paid',
      sent: 'Sent',
      overdue: 'Overdue',
      open: 'Open',
      paid: 'Paid',
      refunded: 'Refunded',
    },
    totalInvoiceValue: 'Total Invoice Value',
    totalInvoices: 'Total Invoices',
    clientInvoice: 'Invoice #{{id}}',
    addClientInvoice: 'Add Invoice for {{client}}',
    placeholder: {
      header: 'Manage your invoices',
      description:
        'Send invoices to your clients, easily enter invoices and manage how much you have open to collect.',
    },
    pay: 'Pay',
  },
  estimates: {
    header: 'My Estimates',
    add: 'Add Estimates',
    edit: 'Edit Estimates',
    tabs: {
      open: 'Open',
      overdue: 'Expired',
      month: 'This Month',
    },
    convert: 'Convert to Invoice',
    preview: 'Estimates preview',
    details: 'Estimate Details',
    includedPayment: 'Deposited Payment',
    estimateBalance: 'Estimate Balance',
    date: 'Estimates date',
    expDate: 'Expiration date',
    fields: {
      newClient: 'New Client',
      firstName: 'First name',
      lastName: 'Last name',
      phoneNumber: 'Telephone',
      notes: 'Notes/Terms',
      comments: 'Comments',
      date: 'Date',
      expDate: 'Expiration date',
      sendEstimate: 'Send estimate to the client',
      email: 'Email',
      quantity: 'Quantity Sold',
      description: 'Description',
      price: 'Price per item',
      quickSale: 'Quick Sale Option',
      product: 'Select a service or item',
      fullPayment: 'Add full / balance payment',
      partialPayment: 'Add partial payment',
      total: 'Payment amount received',
      paymentMethod: {
        searchPlaceholder: 'Expected Payment Method',
        placeholder: 'Select a payment method',
        label: 'Payment Method: {{method}}',
      },
      expectedPaymentMethod: {
        placeholder: 'Select an expected payment method',
        label: 'Payment Method: {{method}}',
      },
      clientName: 'Client Name',
    },
    previewEstimate: 'Preview estimate',
    selectClient: 'Select a client',
    save: 'Save Estimate Details',
    serviceDetails: 'Service Details',
    addService: 'Add more services',
    addEstimateService: 'Add Estimate Service',
    editEstimateService: 'Edit Estimate Service',
    service: 'Service',
    item: 'Item',
    createNewService: 'Create New Service',
    setupTaxes: 'Set up Taxes',
    subtotal: 'Subtotal ${{price}}',
    taxesLegend:
      'Taxes highlighted in grey cannot be selected as they don’t have a tax rate for the Estimate date',
    depositPayment: 'Deposit Payment',
    estimateQuickPayment: 'Estimate Quick Payment',
    addPhoto: 'Add Photo',
    chooseMethod: 'Choose method',
    chooseMethodMessage: 'Please choose a method',
    camera: 'Camera',
    library: 'Library',
    cancle: 'Cancel',
    errors: {
      clientRequired: 'Please select a client',
      productRequired: 'Please select a service or item',
      paymentMethodRequired: 'Please select a payment method',
      negativeBalance: 'Estimate balance cannot be negative!',
      maxImages:
        'Unfortunately, you cannot add more than 3 images per estimate.',
      notConnectedClient:
        'Online payment option can be enabled only if client is a connected client.',
      noOnlinePaymentEnabledClient:
        'Client may not have Online payment option enabled, please sync client details to get updated client info.',
      timezoneError:
        'In order to create invoices you will need to update the address field in your profile section.',
    },
    estimateNumber: 'Estimate Number',
    approved: 'Approved?',
    balance: ' balance to be collected',
    total: {
      open: 'Total of all open estimates ',
      expired: 'Total of all expired estimates ',
      month: 'Total of this month estimates ',
    },
    editEstimate: 'Edit Estimate Details',
    paymentMethod: 'Payment Method',
    expectedPaymentMethod: 'Expected Payment Method',
    approvalStatus: 'Approval Status',
    emailed: 'Emailed?',
    comments: 'Comments',
    addPayment: 'Deposite Payment',
    multiple: 'Multiple',
    estimateStatus: 'Status',
    status: {
      paid: 'Paid',
      open: 'Open',
      overdue: 'Expired',
    },
    estimateTotal: 'Estimate Total',
    paymentsList: 'Payments list',
    paymentTotal: 'Payment total',
    paymentReceiptNumber: 'Receipt No.',
    paymentDate: 'Payment Date',
    estimate: 'Invoice',
    totalPayments: 'Total Payments',
    review: 'Review',
    estimateDetailsReview: 'Estimate Details Review',
    estimateThisMonth: 'Estimates this\nmonth',
    approvedThisMonth: 'Approved estimates this month',
    currentMonthCount: 'New estimates this month',
    openCount: 'Open estimates',
    overdueCount: 'Estimates expiring this month',
    pendingApprovalCount: 'Estimates pending approval',
    tobeSent: 'Estimates to be sent',
    approvedThisMonthCount: 'Estimates approved this month',
    openBalanceTotal: 'Total value of open estimates',
    expiredBalanceTotal: 'Total value of expiring\nestimates (this month)',
    notesHint:
      'You can set up the default content of the invoice Notes/Terms field in your settings',
    searchEstimates: 'Search Estimates',
    resetSearch: 'Reset Search',
    allEstimates: 'All estimates',
    chips: {
      partiallyPaid: 'Partially paid',
      sent: 'Sent',
      expired: 'Expired',
      open: 'Open',
      approved: 'Approved',
      rejected: 'Rejected',
      pending: 'Pending',
      paid: 'Paid',
      // refunded: 'Refunded',
    },
    totalEstimateValue: 'Total Estimate Value',
    totalEstimates: 'Total Estimates',
    clientEstimate: 'Estimate #{{id}}',
    addClientEstimate: 'Add Estimate for {{client}}',
    placeholder: {
      header: 'Manage your estimates',
      description:
        'Prepare, manage and send estimates to your clients, and quickly see the estimates for the month or the ones that have expired',
      // 'Send estimates to your clients, easily enter estimates and manage how much you have open to collect.',
    },
    pay: 'Pay',
    approve: 'Approve',
    reject: 'Reject',
  },
  vendors: {
    header: 'Vendors',
    add: 'Add Vendor',
    edit: 'Edit Vendor Details',
    detailsReview: 'Vendor Details Review',
    noOfVendors: 'Total Vendors',
    expenseMonth: 'Expense this month',
    withExpenses: 'Vendors with expenses this month',
    topExpenses: 'Top 3 Vendor Expense Types',
    valueOfInvoices: 'Value of invoices this month ',
    vendorName: 'Vendor: {{vendorName}}',
    details: {
      title: 'Vendor Details',
      totalExpenses: 'Total Vendor Expenses ',
    },
    search: {
      title: 'Search Vendors',
      placeholder: 'Vendor Name ...',
    },
    errors: {
      unique:
        'You already have a vendor with the same name. Please choose another name.',
    },
    placeholder: {
      header: 'Add vendor details',
      description:
        'Easily enter vendors with their contact details for quicker expense entry.',
    },
  },
  howDoI: {
    general: {
      headings: {
        appUse: 'How do I use the app?',
        useHomeScreen: 'How do I use the home screen?',
        howToNavigate: 'How do I navigate?',
        changeSettings: 'How do I change my settings?',
        setupServices: 'How do I setup the services I offer?',
        paymentMethods: 'How do I setup the payment methods I accept?',
        setupExpanses: 'How do I setup the expenses I want to track?',
        setupReminders: 'How do I setup reminders?',
        manageSubcriptions: 'How do I manage my subscriptions?',
        taxSettings: 'How do I manage my tax settings?',
        appPersonalize: 'How do I personalize the app?',
        changeProfile: 'How do I change my profile picture?',
        gethelp: 'How do I get help?',
      },
      descriptions: {
        howToUseApp:
          'Alpha Pro is the All-in-one mobile app for managing clients, sales & expenses, for scheduling, invoicing and more. Alpha Pro is also free for your clients to use, so invite your clients to the app. After signing up, you will be listed as an Alpha, making it easier for new clients to find you through the app.',
        useHomeScreen:
          'Use your Home screen to view and access your schedule, earnings, appointments, tasks, notifications, and messages. Start your day on the home screen where you can check your weekly performance and get access to all the app features.',
        howToNavigate:
          'On the Home Screen you can access Notifications, and Chat, along with upcoming Appointments, and Tasks. At the bottom of the screen there is a navigation bar, from which you can access Calendar, Clients, Sales, Tasklist, Cash Journals, Payments, Invoices, Expenses, and Vendors. You can personalize the bottom navigation bar as needed and use the sidebar menu at the top to access other options.',
        changeSettings:
          'Select your photo at the top left of the home screen, then choose Settings from the menu that opens on the left.',
        setupServices:
          'Select your photo at the top left of the Home Screen. Select Settings then Services Offered. Select Add Service, then fill out the service information and select Save Changes. Add as many as needed.',
        paymentMethods:
          'Select your photo at the top left of the Home Screen. Select Settings then Payment Methods. Select Add Payment Methods, then fill out the Payment Methods information and select Save Changes. Add as many as needed.',
        setupExpanses:
          'Select your photo at the top left of the Home Screen. Select Settings then Expense types. Select Add Expense types, then fill out the Expense information and select Save Changes. Add as many as needed.',
        setupReminders:
          'Select your photo at the top left of the Home Screen. Select Settings then Reminder. Select Add Reminder, then choose the type of inactivity reminder and how often to be reminded. Select Save Changes. Add as many as needed.',
        manageSubcriptions:
          'Select your photo at the top left of the home screen. Select Settings then Subscription. Note that subscriptions must be managed from where they were created. Therefore if your subscription was create on iOS it has to be managed through an iOS device.',
        taxSettings:
          'Select your photo at the top left of the Home Screen. Select Settings then Tax Settings. Select Add Tax, then enter the tax information and select Save Changes. Add as many as needed.',
        appPersonalize:
          'Select your photo at the top left of the home screen. Select Settings, then select Personalize. Orselect MORE, then select Personalize to adjust as needed.',
        changeProfile:
          'Select your photo at the top left of the home screen, then select My Profile. Select the photo with the blue pencil at the top left, then you will be given the option of taking a picture using the camera, or using a picture from your own library. After selecting the photo, select Save Changes.',
        gethelp:
          'Select your photo at the top left of the Home Screen, then select Contact Us. Here you can, see our contact information, call or email us.',
      },
    },
    providerClients: {
      headings: {
        question1: 'How do I see my client list?',
        question2: 'How do I create a client?',
        question3: 'How do I see the details of a client?',
        question4: 'How do I make changes to a client’s details?',
        question5: 'How do I delete a client?',
        question6: 'How do I search through my clients?',
        question7:
          'How do I see a summary report of my client activity for the month?',
        question8: 'How do I invite a client to the app?',
        question9: 'How do I see the appointment history of a client?',
        question10: 'How do I see the invoice history of a client?',
        question11: 'How do I see the sales history of a client?',
        question12: 'How do I see how much a client owes me?',
        question13: 'How do I see how much a client has spent with me?',
        question14: 'How do I see my top 20 clients?',
        question15:
          'How do I see clients with no activity for the last 3 months?',
      },
      descriptions: {
        answer1:
          'Select Clients from the bottom navigation bar or select MORE, then select Clients to see your client list.',
        answer2:
          'Select the “+” button, at the bottom of your screen, then select New Client. Or from the “My clients” screen, select the ‘Add client’ button. Then fill in the client’s information, then select Save Client Details to finish.Please note that you can also use the “Add from contacts” button on the Client Details page to copy details from your phone contact information.',
        answer3:
          'Select Clients from the bottom navigation bar or select MORE, then select Clients. Find the client you want to view, then select it to open the client’s details.',
        answer4:
          'Open Clients, select the client you want to edit. Select the pencil symbol at the top right, beside the trash symbol. Make your changes, then select Save Client Details to finish.',
        answer5:
          'Open Clients, find the client you want to delete, then tap on it to open. To delete it, select the trash symbol at the top right, then select CONFIRM.',
        answer6:
          'Open Clients, select the magnifying glass at the top right. Type the name of the client you want to find, and select it from the list.',
        answer7:
          'Open Clients, select the pie symbol at the top right beside the magnifying glass. You will see an overview of client activity, such as new clients for the month.',
        answer8:
          'Open Clients, then select the client you want to invite. Under Client App Status, then select blue Invite to the App button',
        answer9:
          'Open Clients, then select the client whose appointments you want to view. Select the Appointments tab to see all their appointments',
        answer10:
          'Open Clients, then select the client whose invoices you want to view. Select the Invoices tab to see all their invoices',
        answer11:
          'Open Clients, then select the client whose sales you want to view. Select the Sales tab to see all their sales',
        answer12:
          'Open Clients, then select the client whose balance you want to view. Under the Details tab, scroll down and look at Balance',
        answer13:
          'Open Clients, then select the client whose spend you want to view. Under the Details tab, scroll down and look at Total Spend',
        answer14:
          'Open Clients, select the pie symbol at the top right beside the magnifying glass. Select Top 20 Clients, the last item in the list.',
        answer15:
          'Open Clients, select the pie symbol at the top right beside the magnifying glass. Close to the end of the list, you will see Clients with no activity for the last 3 months. The number of clients will be shown. You can select it to get a listing of the clients.',
      },
    },
    providerCalender: {
      headings: {
        question1: 'How do I see my appointments for the day?',
        question2: 'How do I create an appointment?',
        question3: 'How do I see the details of an appointment?',
        question4: 'How do I make changes to an appointment?',
        question5: 'How do I delete an appointment?',
        question6: 'How do I see appointment requests sent by clients?',
        question7:
          'How do I confirm or cancel appointment requests sent by clients?',
        question8: 'How do I search through my appointments?',
        question9:
          'How do I see a summary report of my appointments for the week or month?',
        question10: 'How do I convert an appointment into a sale?',
        question11: 'How do I double book an appointment time slot?',
        question12: 'How do I setup my calendar?',
        question13: 'How do I notify my clients of days I will be closed?',
      },
      descriptions: {
        answer1:
          'Select CALENDAR from the bottom navigation bar. Your appointments for the day will be displayed.',
        answer2:
          'Select the “+” button, at the bottom of your screen, then select New Appointment. Select the client, the service being offered, and a time slot. Select Save Appointment Details to finish.',
        answer3:
          'Select CALENDAR from the bar at the bottom of your screen. Select the date of the appointment at the top, then select the appointment you want to view from the list.',
        answer4:
          'Open CALENDAR, select the date, then the appointment you want to edit. Select Edit Appointment at the bottom of your screen. Make your changes, then select Save Appointment Details to finish.',
        answer5:
          'Open CALENDAR, select the date, then the appointment you want to delete. Select the trash symbol at the top right, then select CONFIRM to delete.',
        answer6:
          'Open CALENDAR, select the little calendar symbol at the top of your screen to the right of My Calendar. Your appointment requests will be shown here.',
        answer7:
          'Open CALENDAR, select the little calendar symbol at the top of your screen to the right of My Calendar. Under the appointment request, select “Confirm” or “Cancel”.',
        answer8:
          'Open Calendar. Select the magnifying glass at the top right of the screen. Search appointments using a combination of Client Name, Service, Keyword, and date range.',
        answer9:
          'Open CALENDAR, select the pie symbol at the top right beside the magnifying glass. Displayed will be a weekly and monthly summary of appointment activities.',
        answer10:
          'Open CALENDAR, and select the appointment you want to convert to a sale. Select the dollar symbol at the top right beside the chat symbol',
        answer11:
          'Open CALENDAR. Select Add Appointment to create a new appointment, or open an existing appointment you want to double book, then select Edit Appointment. At the bottom of the Appointment Details screen select the Allow double booking checkbox, then select Save Appointment Details',
        answer12:
          'Select your photo at the top left of the home screen. Select Settings then, Calendar setup. Here you can setup: the Time between appointments, Days open weekly, Lunch start and end, double booking, and client reminder settings',
        answer13:
          'While editing or creating a Closed Day, select the checkbox Send notifications to active clients, at the bottom, underneath the Description field.',
      },
    },
    providerSales: {
      headings: {
        question1: 'How do I see my sales for the week?',
        question2: 'How do I create a sale?',
        question3: 'How do I see the details of a sale?',
        question4: 'How do I make changes to a sale?',
        question5: 'How do I delete a sale?',
        question6: 'How do I search through my sales?',
        question7:
          'How do I see a summary report of my sales for the week, month, or year?',
        question8: 'How do I see my total sales for the month?',
        question9: 'How do I know how much I have sold this year?',
        question10: 'How do I add a ‘Quick Item’ to my sales list?',
        question11: 'How do I remove a ‘Quick Item’ from my sales list?',
        question12: 'How do I send a sales receipt to a client?',
        question13: 'How do I add more services or items to a sale?',
        question14: 'How do I enter a sale for a new client?',
        question15: 'How do I enter a sale with no client details?',
      },
      descriptions: {
        answer1:
          'Select SALES from the bar at the bottom of your screen. Your sales for the week will be displayed.',
        answer2:
          'Select the “+” button, at the bottom of your screen, then select New Sale. Select the options that apply, including the client, item, and payment method. Select Save Sale Details to finish.',
        answer3:
          'Select SALES from the bar at the bottom of your screen. Locate the sale you want to view and select it to open the details for viewing.',
        answer4:
          'Select SALES from the bar at the bottom of your screen. Select the sale you want to edit, then select Edit Sale Details. Make your changes, then select Save Sale Details to finish.',
        answer5:
          'Open SALES. Select the sale you want to delete from your list of sales. Select the trash symbol at the top right, then select DELETE to confirm.',
        answer6:
          'Open SALES. Select the magnifying glass at the top right of the screen. Search sales using a combination of Client Name, Payment Method, Keyword, and Date.',
        answer7:
          'Open SALES, select the pie symbol at the top right beside the magnifying glass. weekly and monthly summary of sales activities.',
        answer8:
          'Open SALES, then select the pie symbol at the top right beside the magnifying glass. You will see the total value of sales for the week and month. See, and Select Number of sales this month, to get the number, and list of sales.',
        answer9:
          'Open SALES, then select the pie symbol at the top right beside the magnifying glass. You will see the Total value of sales this year, at the end of the list.',
        answer10:
          'Select your profile picture on your HOME screen. Select Settings, then select Services offered. While editing or creating a service, select the Quick Sale Option checkbox, underneath Price, then select Save Changes.',
        answer11:
          'Select your profile picture on your HOME screen. Select Settings, then select Services offered. Select the one you want to remove, then select Edit Service. Uncheck the Quick Sale Option checkbox, underneath Price, then select Save Changes.',
        answer12:
          'Open SALES, then select the sale for which you want to email a receipt. Select the share symbol beside the trash symbol at the top right, then select the “Email to” button to send.',
        answer13:
          'Open SALES. Select Add Sale, or select a sale from the list to which you want to add more services. Underneath the Quick Items section, you will see Service Details. Select Add more services, then add or create additional services.',
        answer14:
          'Open SALES, then select Add Sale. At the top of the screen, select the switch beside New client. Three new fields will open beneath the Sale date. These are First Name, Last Name, and Telephone. Fill in these fields, along with the other sale details, then select Save Sale Details.',
        answer15:
          'Open SALES, then select Add Sale. At the top of the screen, select the switch beside No client details. Three new fields will open beneath the Sale date. These are First Name, Last Name, and Telephone. Fill in these fields, along with the other sale details, then select Save Sale Details.',
      },
    },
    providerTasks: {
      headings: {
        question1: 'How do I see my tasks for the day and week?',
        question2: 'How do I create a task?',
        question3: 'How do I see the details of a task?',
        question4: 'How do I make changes to a task?',
        question5: 'How do I repeat a created task?',
        question6: 'How do I delete a task?',
        question7: 'How do I search through my tasks?',
        question8:
          'How do I see a summary report of my tasks for the week or month?',
        question9: 'How do I see all the tasks for the week?',
        question10: 'How do I see all the tasks for the month?',
      },
      descriptions: {
        answer1:
          'Select MORE, then select Tasklist to see your tasks for the week.',
        answer2:
          'Select MORE, then select Tasklist. Select Add Tasks. Enter the Due date, Due time, Task name, along with any additional information, and select Save Task Details to finish.',
        answer3:
          'Select MORE, then select Tasklist. Select the week the task is from, then select the task you want to view from the list. The task’s details will be displayed on your screen.',
        answer4:
          'Select MORE, then select Tasklist. Find the task you want to edit, then select it. Select Edit Task, make the necessary changes, then select Save Task Details to finish.',
        answer5:
          'Select MORE, then select Tasklist.  Find the task you want to repeat, then select Edit Task. Select the slider beside Repeat this task, and set how often you want the task to repeat. Select Continue, then select Save Task Details to finish.',
        answer6:
          'Select MORE, then select Tasklist. Find the task you want to delete, then select it. Select the trash symbol at the top right, then select DELETE to confirm.',
        answer7:
          'Select MORE, then select Tasklist. Select the magnifying glass at the top right of the screen. Use words from the task name or description in the Keyword field if necessary. Select the date range you want to search if applicable, then select Search to display the task(s) below.',
        answer8:
          'Select MORE, then select Tasklist. Select the pie symbol beside the magnifying glass at the top right of the screen.',
        answer9:
          'Select MORE, then select Tasklist. Select the pie symbol beside the magnifying glass at the top right of the screen. Select Tasks this week to see all tasks for the week, whether or not they were completed.',
        answer10:
          'Select MORE, then select Tasklist. Select the pie symbol beside the magnifying glass at the top right of the screen. Select Tasks this month to see all tasks for the month, whether or not they were completed.',
      },
    },
    providerVendors: {
      headings: {
        question1: 'How do I see a list of my vendors?',
        question2: 'How do I create a new vendor?',
        question3: 'How do I see the details of a vendor?',
        question4: 'How do I make changes to a vendor’s details?',
        question5: 'How do I delete a vendor?',
        question6: 'How do I search through my vendors?',
        question7:
          'How do I see a summary of my vendors and related expenses for the month?',
      },
      descriptions: {
        answer1: 'Open Vendors to see your client list.',
        answer2:
          'Open Vendors. Select Add Vendor, fill in the vendor’s information, then select Save Vendor Details to finish.',
        answer3:
          'Open Vendors. Find the vendor you want to view, then select it to open the vendor’s details.',
        answer4:
          'Open Vendors. Select the vendor you want to edit, then select Edit Vendor Details. Make your changes, then select Save Vendor Details to finish.',
        answer5:
          'Open Vendors, find the vendor you want to delete, then tap on it to open. To delete it, select the trash symbol at the top right, then select CONFIRM.',
        answer6:
          'Open Vendors, select the magnifying glass at the top right. Type the name of the vendor you want to find, and select it from the list.',
        answer7:
          'Open Vendors, select the pie symbol at the top right beside the magnifying glass. You will see an overview of client activity, such as new vendors for the month.',
      },
    },
    providerCashJournals: {
      headings: {
        question1: 'How do I see my cash journal entries for the week?',
        question2: 'How do I create a cash journal entry?',
        question3: 'How do I see the details of a cash journal entry?',
        question4: 'How do I make changes to a cash journal entry?',
        question5: 'How do I delete a cash journal entry?',
        question6: 'How do I search my cash journal entries?',
        question7:
          'How do I see the summary of cash entered for the month, week or year?',
        question8: 'How do I see my total cash entries for the week?',
        question9: 'How do I see my total cash entries for the month?',
        question10: 'How do I see my total cash entries for the year?',
      },
      descriptions: {
        answer1:
          'Select MORE, then Cash Journals. Your cash journal entries for the week will be displayed.',
        answer2:
          'Select MORE, then select Cash Journals. Select Add Cash Journals. Fill in the cash journal details, then select Save Cash Journals Details to finish.',
        answer3:
          'Select MORE, then select Cash Journals. Select the week the cash journal is from, then select the cash journal you want to view from the list. The details will be displayed on your screen.',
        answer4:
          'Select MORE, then select Cash Journals. Find the cash journal you want to edit, then select it. Select Edit Cash Journal, make the necessary changes, then select Save Cash Journal Details to finish.',
        answer5:
          'Select MORE, then select Cash Journals. Find the cash journal you want to delete, then select it. Select the trash symbol at the top right, then select DELETE to confirm.',
        answer6:
          'Select MORE, then select Cash Journals. Select the magnifying glass at the top right of the screen. Use words from the journal notes in the Keyword field, if applicable, along with the date range you want to search, then select Search to display the journal entries below.',
        answer7:
          'Select MORE, then select Cash Journal. Select the pie symbol beside the magnifying glass at the top right of the screen.',
        answer8:
          'Select MORE, then select Cash Journal. Select the pie symbol beside the magnifying glass at the top right of the screen. See and select Total cash entered this week to get a breakdown of all cash entries for the week.',
        answer9:
          'Select MORE, then select Cash Journal. Select the pie symbol beside the magnifying glass at the top right of the screen. See and select Total cash entered this month to get a breakdown of all cash entries for the month.',
        answer10:
          'Select MORE, then select Cash Journal. Select the pie symbol beside the magnifying glass at the top right of the screen. See and select Total cash entered this year to get a breakdown of all cash entries for the year.',
      },
    },
    providerExpenses: {
      headings: {
        question1: 'How do I see my expense entries for the week?',
        question2: 'How do I create an expense entry?',
        question3: 'How do I see the details of an expense entry?',
        question4: 'How do I make changes to an expense entry?',
        question5: 'How do I delete an expense entry?',
        question6: 'How do I search my expenses entries?',
        question7:
          'How do I see the summary of my expense activity for the month, week, or year?',
        question8: 'How do I see my total expenses for the week?',
        question9: 'How do I see my total expenses for the month?',
        question10: 'How do I see my total expenses for the year?',
      },
      descriptions: {
        answer1:
          'Select MORE, then Expenses. Your expense entries will be displayed for the week shown at the top of your screen.',
        answer2:
          'Select MORE, then Expenses. Select Add Expense, fill in the expense’s details, then select Save Expense Details to finish.',
        answer3:
          'Select MORE, then Expenses. Select the week the expense is from, then select the expense entry you want to view from the list. The details will be displayed on your screen.',
        answer4:
          'Select MORE, then Expenses. Find the expense entry you want to edit, then select it. Select Edit Expense Details, make the necessary changes, then select Save Expense Details to finish.',
        answer5:
          'Select MORE, then Expenses. Find the expense entry you want to delete, then select it. Select the trash symbol at the top right, then select DELETE to confirm.',
        answer6:
          'Select MORE, then Expenses. Select the magnifying glass at the top right of the screen. Choose/enter the search options that you need, then select Search, to display the result.',
        answer7:
          'Select MORE, then Expenses Select the pie symbol beside the magnifying glass at the top right of the screen.',
        answer8:
          'Select MORE, then Expenses Select the pie symbol beside the magnifying glass at the top right of the screen. At the bottom of the list you will see the value of Total expenses this week. Select Number of expenses this week to see a breakdown of all expenses recorded for the week',
        answer9:
          'Select MORE, then Expenses Select the pie symbol beside the magnifying glass at the top right of the screen. You will see the Expense this month displayed in large numbers at the top right. Select Number of expenses this month to get a breakdown of all expenses recorded for the month.',
        answer10:
          'Select MORE, then Expenses Select the pie symbol beside the magnifying glass at the top right of the screen. You will see the value of Expense this year displayed in large numbers at the top left.',
      },
    },
    providerInvoices: {
      headings: {
        question1: 'How do I see all invoices?',
        question2: 'How do I create a new invoice?',
        question3: 'How do I see the details of an invoice?',
        question4: 'How do I make changes to an invoice?',
        question5: 'How do I delete an invoice?',
        question6: 'How do I search my invoices?',
        question7:
          'How do I see the summary of my invoice activity for the month and year?',
        question8: 'How do I setup my invoice?',
        question9: 'How do I add a logo to my invoice?',
        question10: 'How do I setup standard terms for my invoice?',
        question11: 'How do I email an invoice?',
        question12: 'How do I share an invoice?',
        question13: 'How do I add a payment to an invoice?',
        question14: 'How do I see the payments made on an invoice?',
        question15: 'How do I see all my open invoices?',
        question16: 'How do I see all my overdue invoices?',
        question17: 'How do I see all my invoices for the current month?',
        question18: 'How do I see the balance to be collected on my invoices?',
        question19: 'How do I see the total overdue amount on my invoices?',
      },
      descriptions: {
        answer1:
          'Select MORE, then Invoices. Your invoices will be shown under three tabs, Open, Overdue, and This Month.',
        answer2:
          'Select MORE, then Invoices. Select Add Invoice, fill in the details including Client and services, then select Save Invoice Details to finish.',
        answer3:
          'Select MORE, then Invoices. Select the invoice you want to view from the list. The details will be displayed on your screen.',
        answer4:
          'Select MORE, then Invoices.  Find the invoice you want to edit, then select it. Select Edit Invoice Details, make the necessary changes, then select Save Invoice Details to finish.',
        answer5:
          'Select MORE, then Invoices. Find the invoice you want to delete, then select it. Select the trash symbol at the top right, then select DELETE to confirm.',
        answer6:
          'Select MORE, then Invoices. Select the magnifying glass at the top right of the screen. Choose/enter the search options that you need, then select Search, to display the results.',
        answer7:
          'Select MORE, then Invoices. Select the pie symbol beside the magnifying glass at the top right of the screen.',
        answer8:
          'Select your profile picture on your HOME screen. Select Settings, then select Calendar Setup. Make any necessary changes, then select Save Changes.',
        answer9:
          'Select your photo at the top left of the home screen, then select My Profile. Scroll/swipe down to the end of the page, to the Business logo section. Select the photo with the blue pencil to the right, then you will be given the option of taking a picture using the camera, or using a picture from your own library. Once chosen, select Save Changes',
        answer10:
          'Select your profile picture on your HOME screen. Select Settings, then select Invoice Notes/Terms. Fill in or edit the terms, then select Save.',
        answer11:
          'Select MORE, then Invoices. Select the invoice you want to email. Select the share symbol beside the trash symbol at the top right, then select the “Email to” button to send',
        answer12:
          'Select MORE, then Invoices. Select the invoice you want to share. Select the share symbol beside the trash symbol at the top right. Select the share symbol beside Email to, then select the app you will use to share the invoice.',
        answer13:
          'Select MORE, then Invoices. Select the invoice to which you want to add a payment. Scroll/swipe down the payment details screen that opens, then select Add Payment. Enter the details of the payment, then select Save Payment Details.',
        answer14:
          'Select MORE, then Invoices. Select the invoice for which you want to see payments. At the top, to the right of the Client Name and Invoice Total, select the payment card symbol. You will be presented with the Payments list for the invoice',
        answer15:
          'Select MORE, then Invoices. Select the Open tab at the top to see all open invoices',
        answer16:
          'Select MORE, then Invoices. Select the Overdue tab at the top to see all overdue invoices',
        answer17:
          'Select MORE, then Invoices. Select the This Month tab at the top to see all invoices for the current month',
        answer18:
          'Select MORE, then Invoices. Each listed invoice will have the Invoice Balance indicated. In the Overdue tab, the total balance to be collected will be indicated.',
        answer19:
          'Select MORE, then Invoices. In the Overdue tab, the Total of all overdue invoices will be indicated at the top, underneath the value of balance to be collected.',
      },
    },
    providerChat: {
      headings: {
        question1: 'How do I see all chats?',
        question2: 'How do I start a new chat with a client?',
        question3: 'How do I write/read messages in a chat?',
        question4: 'How do I delete a chat?',
      },
      descriptions: {
        answer1:
          'On your HOME screen, and select the chat symbol at the top right of your screen.',
        answer2:
          'On your HOME screen, and select the chat symbol at the top right of your screen. Select Send a New Message, then select the client you want to start a chat with.',
        answer3:
          'Select the chat symbol at the top right of your HOME screen. Select the chat from the list you want to write/read in, or start a new chat. Type messages into the “Your message” field, and send.',
        answer4:
          'Select the chat symbol at the top right of your HOME screen. Select the chat you want to delete from the list. Select the trash symbol at the top right, then select DELETE to confirm.',
      },
    },
    providerPayments: {
      headings: {
        question1: 'How do I see my payments for the week?',
        question2: 'How do I create a payment?',
        question3: 'How do I see the details of a payment?',
        question4: 'How do I make changes to a payment?',
        question5: 'How do I delete a payment?',
        question6: 'How do I search my payment?',
        question7:
          'How do I see the summary of my payment activity for the week, month, and year?',
        question8: 'How do I Email receipt (short version)',
        question9: 'How do I send a payment receipt to a client?',
        question10: 'How do I see my total payments for the week?',
        question11: 'How do I see my total payments for the month?',
        question12: 'How do I see my total payments for the year?',
      },
      descriptions: {
        answer1:
          'Select MORE, then Payments. Your payments will be displayed for the week shown at the top of your screen.',
        answer2:
          'Select MORE, then Payments. Select Add Payment, fill in the payment’s details, then select Save Payment Details to finish.',
        answer3:
          'Select MORE, then Payments. Select the week the payment is from, then select the payment you want to view from the list. The details will be displayed on your screen.',
        answer4:
          'Select MORE, then Payments Find the payment you want to edit, then select it. Select Edit Payments Details, make the necessary changes, then select Save Payments Details to finish.',
        answer5:
          'Select MORE, then Payments. Find the payment you want to delete, then select it. Select the trash symbol at the top right, then select DELETE to confirm.',
        answer6:
          'Select MORE, then Payments. Select the magnifying glass at the top right of the screen. Choose/enter the search options that you need, then select Search to display the result.',
        answer7:
          'Select MORE, then Payments Select the pie symbol beside the magnifying glass at the top right of the screen.',
        answer8:
          'Select the payment for which you want to email a receipt. Select the share symbol beside the trash symbol at the top right. Select the “Email to” button to send.',
        answer9:
          'Select MORE, then Payments. Select the payment for which you want to email a receipt. Select the share symbol beside the trash symbol at the top right. Select the “Email to” button to send.',
        answer10:
          'Select MORE, then Payments Select the pie symbol beside the magnifying glass at the top right of the screen. The total value of Payments this week will be displayed in the bottom row.',
        answer11:
          'Select MORE, then Payments Select the pie symbol beside the magnifying glass at the top right of the screen. The total value of Payments this month will be displayed in the top row on the right.',
        answer12:
          'Select MORE, then Payments Select the pie symbol beside the magnifying glass at the top right of the screen. The total value of Payments this year will be displayed in the top row on the left',
      },
    },
    providerNotifications: {
      headings: {
        question1: 'How do I see all received notifications?',
      },
      descriptions: {
        answer1:
          'On your HOME screen, select the bell symbol beside the chat symbol at the top right of your screen. ',
      },
    },
    providerProfile: {
      headings: {
        question1: 'How do I view or edit my profile?',
      },
      descriptions: {
        answer1:
          'On your HOME screen, select your profile picture to open the side menu, then select My Profile. Make the necessary changes, then select Save Changes.',
      },
    },
    contactUs: {
      headings: {
        question1: 'How do I see Alpha Pro’s contact information?',
      },
      descriptions: {
        answer1:
          'On your HOME screen, select your profile picture to open the side menu, then select Contact Us.  Call or send an email.',
      },
    },
    providerReports: {
      headings: {
        question1: 'How do I see the types of reports that can be generated?',
        question2: 'How do I generate a Transaction Listing Report?',
        question3: 'How do I generate a Transaction Summary Report?',
      },
      descriptions: {
        answer1:
          'On your Home screen, select your profile picture to open the side menu, then select Reports.',
        answer2:
          'On your HOME screen, select your profile picture to open the side menu, then select Reports. Select Transaction Listing, choose the options needed, then select Display Report.',
        answer3:
          'On your HOME screen, select your profile picture to open the side menu, then select Reports. Select Transaction Summary, choose the options needed, then select Display Report.',
      },
    },
    providerSettings: {
      closedDays: {
        headings: {
          question1: 'How do I see my Closed Days Settings?',
          question2: 'How do I add Closed Days?',
          question3: 'How do I make changes to Closed Days?',
          question4: 'How do I Delete Closed Days?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Closed Days.',
          answer2:
            'Select your profile picture on your HOME screen. Select Settings, then select Closed Days. Select Add Closed Days, enter the information you desire, then select Save Changes.',
          answer3:
            'Select your profile picture on your HOME screen. Select Settings, then select Closed Days. Select the closed day you want to edit to, change the information you desire, then select Save Changes.',
          answer4:
            'Select your profile picture on your HOME screen. Select Settings, then select Closed Days. Select the closed day you want to delete, select the trash symbol at the top right, then select DELETE.',
        },
      },
      calendar: {
        headings: {
          question1:
            'How do I make changes to the Calendar setup such as opening and lunch hours?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Calendar Setup. Make any necessary changes, then select Save Changes.',
        },
      },
      ServicesOffered: {
        headings: {
          question1: 'How do I see the services I offer?',
          question2: 'How do I add a new service I want to offer?',
          question3: 'How do I make changes to a service I offer?',
          question4: 'How do I delete a service from my offered services?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Services offered.',
          answer2:
            'Select your profile picture on your HOME screen. Select Settings, then select Services offered. Select Add Service, fill in the service’s information, then select Save Changes.',
          answer3:
            'Select your profile picture on your HOME screen. Select Settings, then select Services offered. Select the service you want to edit, change the information you desire, then select Save Changes.',
          answer4:
            'Select your profile picture on your HOME screen. Select Settings, then select Services offered. Select the service you want to delete, select the trash symbol at the top right, then select DELETE.',
        },
      },
      paymentMethods: {
        headings: {
          question1: 'How do I see my available payment methods?',
          question2: 'How do I add a payment method?',
          question3: 'How do I edit a payment method?',
          question4: 'How do I Delete a payment method?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Payment methods.',
          answer2:
            'Select your profile picture on your HOME screen. Select Settings, then select Payment methods. Select Add Payment Method, fill in the payment method information, then select Save Changes.',
          answer3:
            'Select your profile picture on your HOME screen. Select Settings, then select Payment methods. Select the payment method you want to edit, change the information you desire, then select Save Changes.',
          answer4:
            'Select your profile picture on your HOME screen. Select Settings, then select Payment methods. Select the payment method you want to delete, select the trash symbol at the top right, then select DELETE.',
        },
      },
      taxSettings: {
        headings: {
          question1: 'How do I see my tax settings?',
          question2: 'How do I add a new tax?',
          question3: 'How do I edit a tax setting?',
          question4: 'How do I delete a tax?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Tax Settings.',
          answer2:
            'Select your profile picture on your HOME screen. Select Settings, then select Tax Settings. Select Add Tax, fill in the tax information, then select Save Changes.',
          answer3:
            'Select your profile picture on your HOME screen. Select Settings, then select Tax Settings. Select the tax you want to edit, change the information you desire, then select Save Changes.',
          answer4:
            'Select your profile picture on your HOME screen. Select Settings, then select Tax Settings. Select the tax you want to delete, select the trash symbol at the top right, then select DELETE.',
        },
      },
      expansesTypes: {
        headings: {
          question1: 'How do I see all expense types that I created?',
          question2: 'How do I add a new expense type?',
          question3: 'How do I edit an expense type?',
          question4: 'How do I delete an expense type?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Expense types.',
          answer2:
            'Select your profile picture on your HOME screen. Select Settings, then select Expense types. Select Add Expense Type, fill in the expense information, then select Save Changes.',
          answer3:
            'Select your profile picture on your HOME screen. Select Settings, then select Expense types. Select the expense type you want to edit, change the information you desire, then select Save Changes.',
          answer4:
            'Select your profile picture on your HOME screen. Select Settings, then select Expense types. Select the expense you want to delete, select the trash symbol at the top right, then select DELETE.',
        },
      },
      invoiceNotesTerms: {
        headings: {
          question1: 'How do I set up Invoice Notes/Terms?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Invoice Notes/Terms. Fill in or edit the terms, then select Save.',
        },
      },
      setupHomepage: {
        headings: {
          question1: 'How do I change what is shown on the Home screen?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Setup Homepage. Enable or disable the options you desire, then select Save Changes.',
        },
      },
      notifications: {
        headings: {
          question1:
            'How do I change settings for Push, Email, and SMS notifications?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Notifications. Enable or disable the notifications you desire, then select Save.',
        },
      },
      subscriptions: {
        headings: {
          question1: 'How do I View subscription details?',
          question2: 'How do I renew my subscription?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Subscription.',
          answer2:
            'If your subscription expires, the Pick Subscription screen will be displayed. Select the subscription of your choice, then select Renew subscription.',
        },
      },
      bottomMenu: {
        headings: {
          question1:
            'How do I customize the menu bar at the bottom of the screen?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Bottom Menu. Make the desired changes to the, then select Save. ',
        },
      },
      inactivityReminders: {
        headings: {
          question1:
            'How do I see reminders for sales, invoices, or expense inactivity?',
          question2:
            'How do I add reminders for sales, invoices, or expense inactivity?',
          question3:
            'How do I change reminders for sales, invoices, or expense inactivity?',
          question4:
            'How do I delete reminders for sales, invoices, or expense inactivity?',
        },
        descriptions: {
          answer1:
            'Select your profile picture on your HOME screen. Select Settings, then select Reminders.',
          answer2:
            'Select your profile picture on your HOME screen. Select Settings, then select Reminders. Select Add Reminder, Select the reminder information, then select Save Changes.',
          answer3:
            'Select your profile picture on your HOME screen. Select Settings, then select Reminders. Select the reminder you want to edit, change the information you desire, then select Save Changes.',
          answer4:
            'Select your profile picture on your HOME screen. Select Settings, then select Reminders. Select the reminder you want to delete, select the trash symbol at the top right, then select DELETE.',
        },
      },
    },
    client: {
      headings: {
        question1: 'How do I find new providers?',
        question2: 'How do I see my list of providers?',
        question3: 'How do I view my notifications?',
        question4: 'How do I book an appointment with a provider?',
        question5: 'How do I find the direction to a provider’s location?',
        question6: 'How do I see the appointment history with a provider?',
        question7: 'How do I see the invoice history with a provider?',
        question8: 'How do I see the sales history with a provider?',
        question9: 'How do I see the payment history with a provider?',
        question10: 'How do I see the working hours of a provider?',
        question11: 'How do I see where a provider is located?',
        question12:
          'How do I see the appointments I have scheduled with my providers?',
        question13: 'How do I check in on arrival for an appointment?',
        question14: 'How do I change my profile settings?',
        question15: 'How do I setup my notifications?',
        question16: 'How do I setup my reminder time?',
        question17: 'How do I reset my password?',
        question18: 'How do I change my profile picture?',
        question19: 'How do I see all chats?',
        question20: 'How do I start a new chat with a client?',
        question21: 'How do I write/read messages in a chat?',
        question22: 'How do I delete a chat?',
      },
      descriptions: {
        answer1:
          'Search for providers from the Home Screen search bar at the top, or by selecting PROVIDER, then Add Provider. In the search bar type a provider name, or type the service you are looking for, then select a provider from the list that comes up',
        answer2:
          'Select PROVIDER from the menu bar at the bottom of your screen. Your My Providers list will open.',
        answer3:
          'On your HOME screen, select the bell symbol beside the chat symbol at the top right of your screen.',
        answer4:
          'Search for, and select a Provider, or select one from your list of Providers. Select the Appointments tab, beside Details, then select Book Appointment. Select the service, appointment slot, fill in any other relevant field, then select Confirm. The Provider will be sent a request to confirm the appointment.',
        answer5:
          'Search for, and select a Provider, or select one from your list of Providers. On the Provider’s details page, select the Get direction button to open with your maps application.',
        answer6:
          'Select PROVIDER from the menu bar at the bottom of your screen, then select the Provider. On the Provider’s details page, under the Appointments tab you will see all appointments you have scheduled with the provider.',
        answer7:
          'Select PROVIDER from the menu bar at the bottom of your screen, then select the Provider. On the Provider’s details page, under the Invoices tab you will see all your invoices with the provider.',
        answer8:
          'Select PROVIDER from the menu bar at the bottom of your screen, then select the Provider. On the Provider’s details page, under the Sales tab you will see your sales history the provider.',
        answer9:
          'Select PROVIDER from the menu bar at the bottom of your screen, then select the Provider. On the Provider’s details page, under the Payments tab you will see your payments history with the provider.',
        answer10:
          'Search for, and select a Provider, or select one from your list of Providers. On the Provider’s details page, scroll/swipe down to the Business Details. The Working hours will be displayed in the list below House call and the Shop/Business Name',
        answer11:
          'Search for a Provider, or select one from your list of Providers. On the Provider’s details page, the Address is located beneath Email and WhatsApp.',
        answer12:
          'Select CALENDAR from the menu bar at the bottom of your screen. Your scheduled appointments for the day will be listed here. You are able to see the appointments for another day by selecting a date from the top of the screen.',
        answer13:
          'Select CALENDAR from the menu bar at the bottom of your screen, then select the appointment you want to check in to. Select the Check In button at the bottom of the screen.',
        answer14:
          'Select your profile photo at the top left of your home screen, then select the profile photo with the blue pencil at the top right of the screen. Make changes to your profile and select Save Changes.',
        answer15:
          'Select your profile photo at the top left of your home screen, then select Notification Setup. Make changes to your notification settings and select Save Changes.',
        answer16:
          'When setting up a new appointment, you can set how long before the appointment to remind you using the Remind me section, which is below the Appointment slot and above the Notes section',
        answer17:
          'Select your profile photo at the top left of your home screen, then select Reset Password. Enter the Current password, and then enter the new password once in the New password field, and again in the Confirm new password field. Select Update password button to finish.',
        answer18:
          'Select your profile photo at the top left of your home screen, then select the profile photo with the blue pencil at the top right of the screen. Select the photo with the blue pencil at the top left, then you will be given the option of taking a picture using the camera, or using a picture from your own library.',
        answer19:
          'On your HOME screen, and select the chat symbol at the top right of your screen. All open chats will be listed',
        answer20:
          'On your HOME screen, and select the chat symbol at the top right of your screen. Select Send a New Message, then select the Provider you want to start a chat with.',
        answer21:
          'Select the chat symbol at the top right of your HOME screen. Select the chat from the list you want to write/read in, or start a new chat. Type messages into the “Your message” field, and send.',
        answer22:
          'Select the chat symbol at the top right of your HOME screen. Select the chat you want to delete from the list. Select the trash symbol at the top right, then select DELETE to confirm.',
      },
    },
    clientChatMessages: {
      headings: {
        question1: 'How do I see all chats?',
        question2: 'How do I start a new chat with a client?',
        question3: 'How do I write/read messages in a chat?',
        question4: 'How do I delete a chat?',
      },
      descriptions: {
        answer1:
          'On your HOME screen, and select the chat symbol at the top right of your screen.',
        answer2:
          'On your HOME screen, and select the chat symbol at the top right of your screen. Select Send a New Message, then select the Provider you want to start a chat with.',
        answer3:
          'Select the chat symbol at the top right of your HOME screen. Select the chat from the list you want to write/read in, or start a new chat. Type messages into the “Your message” field, and send.',
        answer4:
          'Select the chat symbol at the top right of your HOME screen. Select the chat you want to delete from the list. Select the trash symbol at the top right, then select DELETE to confirm.',
      },
    },
  },
  form: {
    name: 'Name',
    email: 'Email',
    phoneNumber: 'Telephone',
    notes: 'Notes',
    address: 'Address',
    addressLine: 'Address line...',
    additionalAddress: 'Additional address details',
    description: 'Description',
    vendorName: 'Vendor',
    invoiceNumber: 'Invoice number',
    expenseTotal: 'Expense Total',
    total: 'Total',
    date: 'Date',
    period: 'Period',
    password: 'Password',
  },
  contactsModal: {
    addFromContacts: 'Add from contacts',
    yourList: 'Your contacts list',
    choseFromContacts: 'Choose from contacts',
    importContact: 'Import contact',
    accessDenied: 'Please allow access to contacts in settings',
  },
  expenses: {
    add: 'Add Expense',
    total: 'Expense total',
    details: {
      title: 'Expense Details',
      vendor: 'Vendor:',
      date: 'Expense date',
      total: 'Expense total',
      invoiceNumber: 'Vendor invoice',
      expenseType: 'Expense type',
      paymentMethod: 'Payment method',
      notes: 'Notes',
    },
    detailsReview: 'Expense Details Review',
    expensesThisYear: 'Expense this year',
    expensesThisMonth: 'Expense this month',
    noOfExpenses: 'No. of expenses',
    noOfExpensesThisWeek: 'Number of expenses this week',
    noOfExpensesThisMonth: 'Number of expenses this month',
    totalExpensesThisWeek: 'Total expenses this week',
    totalExpenseValue: 'Total expense value',
    date: 'Expense date',
    search: 'Search Expenses',
    fields: {
      vendor: {
        placeholder: 'Vendor',
        label: 'Vendor: {{vendor}}',
      },
      expenseType: {
        placeholder: 'Expense Type',
        label: 'Expense Type: {{type}}',
      },
      paymentMethod: {
        placeholder: 'Payment Method',
        label: 'Payment Method: {{method}}',
      },
    },
    editExpenseDetails: 'Edit Expense Details',
    placeholder: {
      header: 'Manage your expenses',
      description:
        'Track expenses from your vendors, and get a quick overview of your costs to help manage your spending.',
    },
    errors: {
      lengthError: 'Expense total cannot be less than and equal to zero',
      timezoneError:
        'In order to create expenses you will need to update the address and timezone field in profile section.',
    },
  },
  expenseTypes: {
    add: 'Add Expense Type',
    new: 'New Expense Type',
    edit: 'Edit Expense Type',
    fields: {
      active: 'Active',
      shortName: 'Short name',
      description: 'Description',
    },
    placeholders: {
      shortName: 'Short name*',
      description: 'Description*',
    },
    errors: {
      uniq: 'You already have an existing expense type with the name {{shortName}}. Please choose another name.',
    },
  },
  cashJournals: {
    add: 'Add Cash Journal',
    cashTotal: 'Cash Total',
    description: 'Description',
    initialDescription: 'Cash received',
    back: 'Cash journals',
    details: {
      title: 'Cash Journal',
      vendor: 'Vendor:',
      date: 'Expense date',
      total: 'Expense total',
      invoiceNumber: 'Vendor invoice',
      expenseType: 'Expense type',
      paymentMethod: 'Payment method',
      notes: 'Notes',
      edit: 'Edit Cash Journal Details',
      totalCash: 'Total Cash {{total}}',
      detail: 'Cash journal detail',
      dateEntered: 'Date entered',
    },
    search: {
      back: 'Search Cash Journals',
      totalCash: 'Total cash entries',
      total: 'Total cash journals',
    },
    review: {
      header: 'Review',
      title: 'Cash Journal Details Review',
      total: {
        week: 'Total cash entered this week',
        month: 'Total cash entered this month',
        year: 'Total cash entered this year',
      },
      totalCash: 'Total cash value',
      number: 'Number of entries',
    },
    placeholder: {
      header: 'Track your cash',
      description:
        'Don’t have the time to enter each sale or invoice? Then use this feature to enter the total amount received for the day.',
    },
    errors: {
      timezoneError:
        'In order to create cash journals you will need to update the address and timezone field in profile section.',
      roundFigureError: 'Please input round figured value in total.',
      lengthError: 'Enter an amount lower than 6 digits.',
    },
  },
  chats: {
    header: 'My messages',
    add: 'Send a New Message',
    noMessagePlaceholder: 'This chat does not have messages',
    total: '{{count}} client',
    total_plural: '{{count}} clients',
    addChat: {
      header: 'New Message',
    },
    chat: {
      placeholder: 'Your Message...',
      copy: 'Copy text',
      delete: 'Delete message',
      copied: 'Copied!',
      unreadMessages: 'Unread messages',
    },
    alerts: {
      deleteChat: {
        provider: {
          connected:
            'Are you sure you want to delete this chat? Please note, this procedure will irreversibly delete the chat history for you.',
          unconnected:
            'Are you sure you want to delete this chat? Please note, the client is not connected, so you may not be able to initiate a new chat with this client. The chat history will be irreversibly deleted for you. ',
        },
        client:
          'Are you sure you want to delete this chat? Please note, this procedure will irreversibly delete the chat history for you.',
      },
    },
    errors: {
      create:
        'Message cannot be delivered due to technical issues. Please check your internet connected and try again',
      deleteMessage: 'You cannot delete already read messages',
    },
  },
  contactUs: {
    header: 'Contact Us',
    title: 'Get in Touch',
    subtitle: 'Contact with our support team for your query',
    sectionTitle: 'Contact Details',
    website: 'Website',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    callUs: 'Call Us',
    sendEmail: 'Send Email',
  },
  inviteToAlpha: {
    caption: 'Work Smarter',
    title: 'Invite To Alpha',
    inviteToProviders: 'Invite Providers',
    heading: 'Let’s stay in touch the easy way with Alpha Pro...',
    clientInviteToFriends: 'Invite Friends/Others',
    inviteToProvidersHeading: 'Manage your appointments in one place...',
    providerInviteToClientHeading: 'Book appointments with me the easy way!',
    providerInviteToProviderHeading:
      'Stay connected with your clients with Alpha Pro!',
    providerInvitePara1:
      'Download Alpha Pro and connect with your existing clients and let new clients find you. Alpha pro is an all-in-one mobile app designed for managing clients, sales & expenses, for scheduling, invoicing and more!',
    providerInvitePara2:
      'Your clients can also download the app and use it to schedule appointments 24/7. Once you sign up, you will also be listed as an Alpha on the platform for free marketing and new clients can discover your services.',
    inviteToClientsPara1:
      'Hey, to see my schedule, book appointments with ease, and manage payments and communication, download Alpha Pro!',
    inviteToClientsPara2:
      'Save the hassle and headache of back and forth calls, and most importantly – your time! With the app you can schedule your own appointments, message me directly, and see the details of all our activities. You can also search for other providers on the app.',
    inviteToProvidersPara1:
      'Tired of tracking and booking appointments on multiple platforms? Download the Alpha Pro app and take care of your weekly, monthly, and one-off appointments in one place.',
    inviteToProvidersPara2:
      'Download the app to see if your favorite hairstylist, handyman or other service provider is on there, and if not – recommend it to them. With the app you can chat directly with your providers, search for other providers and schedule your own appointments.',
    paragraph1:
      'Download the Alpha Pro app, with the app we can stay connected, schedule appointments with ease, and communicate within the app. Your clients can download the app and directly schedule their own appointments 24/7.',
    paragraph2:
      'All you need to do is setup your account and input your availability for your clients to see. With the app you can also manage your clients, track sales and expenses, invoices and more. You will also be listed as an Alpha on the platform and get free marketing so new clients can discover your services.',
    paragraph3:
      'The best part is you will be listed as an Alpha on the platform and new clients can discover your services.',
    inviteLink:
      'Let’s stay in touch the easy way with Alpha Pro...\n\nDownload the Alpha Pro app, with the app we can stay connected, schedule appointments with ease, and communicate within the app. Your clients can download the app and directly schedule their own appointments 24/7\n\nAll you need to do is setup your account and input your availability for your clients to see. With the app you can also manage your clients, track sales and expenses, invoices and more. You will also be listed as an Alpha on the platform and get free marketing so new clients can discover your services.\n\nhttps://6atzr.app.link/e/goalphapro',
    clientInviteToFriendsLink:
      'Manage your appointments in one place...\n\nTired of tracking and booking appointments on multiple platforms? Download the Alpha Pro app and take care of your weekly, monthly, and one-off appointments in one place.\n\nDownload the app to see if your favorite hairstylist, handyman or other service provider is on there, and if not – recommend it to them. With the app you can chat directly with your providers, search for other providers and schedule your own appointments.\n\nhttps://6atzr.app.link/e/goalphapro',
    providerInviteClientLink:
      'Book appointments with me the easy way!\n\nHey, to see my schedule, book appointments with ease, and manage payments and communication, download Alpha Pro!\n\nSave the hassle and headache of back and forth calls, and most importantly – your time! With the app you can schedule your own appointments, message me directly, and see the details of all our activities. You can also search for other providers on the app.\n\nhttps://6atzr.app.link/e/goalphapro',
    providerInviteProviderLink:
      'Stay connected with your clients with Alpha Pro!\n\nDownload Alpha Pro and connect with your existing clients and let new clients find you. Alpha pro is an all-in-one mobile app designed for managing clients, sales & expenses, for scheduling, invoicing and more!\n\nYour clients can also download the app and use it to schedule appointments 24/7. Once you sign up, you will also be listed as an Alpha on the platform for free marketing and new clients can discover your services.\n\nhttps://6atzr.app.link/e/goalphapro',
  },
  notifications: {
    title: 'My Notifications',
    labels: {
      date: 'Date',
      time: 'Time',
      service: 'Service',
      newAppointmentDetails: 'New appointment details',
      newClosedDaysDetails: 'New closed days details',
      saleTotal: 'Sale total',
      saleNumber: 'Sale number',
      saleDate: 'Sale date',
      invoiceTotal: 'Invoice total',
      invoiceNumber: 'Invoice number',
      invoiceDate: 'Invoice date',
      invoiceDueDate: 'Invoice due date',
      estimateTotal: 'Estimate total',
      estimateNumber: 'Estimate number',
      estimateDate: 'Estimate date',
      estimateDueDate: 'Expiration date',
      reason: 'Reason',
      paymentTotal: 'Payment total',
      receiptNumber: 'Receipt number',
      paymentDate: 'Payment date',
      taskReminder:
        'You have a pending task {{name}} that should be completed by {{date}}',
      rewardType: 'Reward type',
      rewardReason: 'Reward reason',
      rewardServices: 'Reward services',
      offer: 'Offer',
      birthDate: 'Birthday date',
      refundAmount: 'Refund amount',
      paymetDate: 'Payment date',
      paymentNumber: 'Payment No',
      rejectedRefundAmount: 'Amount',
      paymentAmount: 'Payment amount',
      saleInvoiceNo: 'Sale/Invoice No.',
      saleInvoiceDate: 'Sale/Invoice date',
      saleSpecialName: 'Sale special name',
      salePrice: 'Price',
    },
  },
  home: {
    greetings: 'Hi {{name}}',
    yourSchedule: 'Your schedule for ',
    statistics: {
      earned: {
        thisWeek: ' earned this week',
        otherWeek: ' earned on the selected week',
      },
      goal: 'Goal for the week ',
    },
    nextAppointments: 'You have {{count}} appointment for {{date}}',
    nextUpcomingAppointments:
      'You have {{count}} more appointment for {{date}}',
    nextAppointments_plural: 'You have {{count}} appointments for {{date}}',
    previousAppointments: 'You had {{count}} appointment for {{date}}',
    previousAppointments_plural: 'You had {{count}} appointments for {{date}}',
    nextTasks: 'Your tasks to complete by {{date}}',
    showAllAppointments: 'Show all appointments',
    noAppointments: 'No appointments for {{date}}',
    noMoreAppointments: 'No more appointments for {{date}}',
    upcomingAppointments: '{{count}} upcoming appointment',
    upcomingAppointments_plural: '{{count}} upcoming appointments',
    manageBookings: 'Track & manage your bookings',
    review: {
      header: 'Performance Review',
      hint: 'Based on the date selected on the homepage',
      periods: {
        week: 'Week',
        month: 'Month',
        year: 'Year',
      },
      details: {
        netIncome: 'Net Income',
        totalIncome: 'Total income',
        goalCompleted: 'Goal Completed',
        totalExpenses: 'Total Expenses',
        wantedToEarn: 'You wanted to earn',
        weekAlreadyBooked: '% of week already booked',
        newClients: 'New clients this {{period, lowercase}}',
        activeClients: 'Active clients this {{period, lowercase}}',
        appointmentEntered: 'Appointments entered',
        pastDueInvoices: 'Past due invoices',
        totalCashCollected: 'Total money collected today',
      },
    },
    placeholder: {
      header: 'Start your day from here',
      description:
        'Check your weekly performance, upcoming appointments and tasks. Access all the app features from the bottom navigation bar and the sidebar menu at the top.',
    },
    otherServices: 'Other services',
  },
  scheduleBadge: {
    yourSchedule: 'Your schedule {{be}} ',
    status: {
      lite: 'Lite ',
      normal: 'Normal ',
      busy: 'Busy ',
    },
    futureDate: 'on {{date}}',
  },
  reports: {
    title: 'Reports',
    transactionListing: 'Transaction Listing',
    transactionSummary: 'Transaction Summary',
    typeOfTransaction: 'Select type of transaction to show',
    typeOfTransactionLabel: 'Type of transaction',
    sendReportTo: 'Send report to',
    sendReport: 'Send Report',
    displayReport: 'Display Report',
    startDate: 'Start date',
    endDate: 'End date',
    emailReport: 'Email report',
    allTransactions: 'All transactions',
    onlySales: 'Only sales',
    onlyInvoices: 'Only invoices',
    onlyPayments: 'Only payments',
    onlyExpenses: 'Only expenses',
    onlyCashJournals: 'Only cash journals',
    totalIncomeDetails: 'Total Income Details',
    netIncomeDetails: 'Net Income Details',
    enterDate: 'Enter date range',
    dateRange: 'Select date range for report',
    preview: 'Report preview',
    messages: {
      reportSended: 'Report has been successfully sent',
    },
    errors: {
      notFoundParameters:
        'The generated report is empty as we could not find transactions that match parameters that you selected. Please select other parameters and try again.',
    },
  },
  trainingVideos: {
    title: 'Training Videos',
  },
  quickPromotion: {
    title: 'Quick Promotion',
    add: 'Add Quick Promotion',
    editTitle: 'Edit Quick Promotion',
    discount: 'Discount',
  },
  clientConnect: {
    title: 'Client Connect',
    options: {
      social: 'Connect your social media',
      shareApp: 'Share app with your clients',
      special: 'Sales special',
      promotion: 'Quick promotion',
      rewards: 'Client rewards',
      blast: 'Client blast',
      mediaPost: 'Social Media Post',
    },
  },
  clientBlast: {
    // title: 'Client message blaster',
    title: 'Client Blast',
    options: {
      social: {
        title: 'Post your services on social media',
        description:
          'Post details about who you are and your services to your social media accounts, introduce and re-introduce yourself and your services',
      },
      specials: {
        title: 'Post details about sales specials',
        description:
          'Post or repost details about your sales special, discounts and promotions directly to your social media',
      },
      missing: {
        title: 'We miss you',
        description:
          'React out to clients you have not seen recently and tell them you miss them and and invite them back',
      },
      loyalty: {
        title: 'Loyalty details',
        description:
          'Let your new and existing clients know about your loyalty and reward programs with a quick post',
      },
      closed: {
        title: 'Close days',
        description:
          'Remind your clients when you will be off and not available to offer your services to them',
      },
      general: {
        title: 'Post general message to clients',
        description:
          'Post a genral message to your clients, either through your social media or directly thorugh our in-app-messaging',
      },
      invite: {
        title: 'Invite clients on social media',
        description:
          'Post a message to social media, inviting  clients to try out the Alpha app and start entering their own appointments 24 * 7',
      },
      introduce: {
        title: 'Introduce a new service',
        description:
          'Post a general message to social media and your clients, inviting them to try out a new or existing service offering',
      },
      alpha: {
        title: 'Invite clients to alpha',
        description:
          'Post a general message to your clients, inviting them to try out the Alpha app and start entering their own appointments 24 * 7',
      },
    },
  },
  clientGroups: {
    title: 'Select clients',
    rightHeader: 'Continue',
    options: {
      all: 'All clients',
      new: 'New clients (added within last 30 days)',
      notActive: 'Clients with no activity for last 3 months',
      withReward: 'Clients with rewards in the next 30 days',
      clientsUsingApp: 'Clients using app',
      notUsingApp: 'Clients not using app',
    },
  },
  CompleteBlastDetails: {
    title: 'Complete blast details',
    description: {
      postYourService:
        'Check out my services:\n\nClients can now find me and book their appointments with me 24 x 7 using the Alpha Pro mobile application on both Apple and Android.\n\nThanks,\n{{ provider }}\n\nFind us on the Alpha Pro App and book your appointments.',
      salesSpecials:
        'Something new:\n\nSome new services and options have been added to our menu. Check them out and book your next appointment on the Alpha Pro mobile app.\n\nThanks,\n{{  provider }}\n\nFind us on the Alpha Pro App and book your appointments.',
      missYou:
        'It’s been a while:\n\nIt’s been a while since your last appointment. We are still here and ready to take care of you. Go ahead and find us on the Alpha Pro mobile platform and book your next appointment.\n\nThanks,\n{{  provider }}\n\nFind us on the Alpha Pro App and book your appointments.',
      loyaltyDetails:
        'We take care of our loyal customers:\n\nOur loyalty and rewards program keeps our customers coming back. Ask about our loyalty and birthday rewards program and see what benefits are waiting on you.\n\nThanks,\n{{  provider }}\n\nFind us on the Alpha Pro App and book your appointments.',
      closeDays:
        'Taking some time off:\n\nI will be taking some time and will be closed on the following days:\n[Jan 1, 2023 to Jan 1, 2023]\n\nPlease make your appointments before or after those days.\n\nThanks,\n{{  provider }}\n\nFind us on the Alpha Pro App and book your appointments.',
      generalMesage:
        'To our loyal customers …\n\nThanks,\n{{  provider }}\n\nFind us on the Alpha Pro App and book your appointments.',
      inviteClients:
        'Find me on Alpha Pro:\n\nFYI: I signed up and started using the Alpha Pro mobile platform. Clients can now find me and book their appointments with me 24 x 7 using the Alpha Pro mobile application.\n\nThanks,\n{{  provider }}\n\nFind us on the Alpha Pro App and book your appointments.',
    },
  },

  SocialMedia: {
    facebook: 'Share on Facebook',
    instagram: 'Share on Instagram',
    otherApps: 'Share with other apps',
    shareWithClient: 'Share with clients on app',
  },
  sharePost: {
    sharePost: 'Share post',
  },
  socialMediaPost: {
    title: 'Social Media Post Only',
  },
};
