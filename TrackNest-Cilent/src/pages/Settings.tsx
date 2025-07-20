import { useState } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { User, Shield, Settings as SettingsIcon, Bell, CreditCard, Network, Eye, EyeOff, Globe, Clock, Sun, Download, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SettingsTab = "profile" | "security" | "preferences" | "notifications" | "billing" | "integrations";

const settingsTabs = [
  { id: "profile" as SettingsTab, label: "Profile", icon: User },
  { id: "security" as SettingsTab, label: "Security", icon: Shield },
  { id: "preferences" as SettingsTab, label: "Preferences", icon: SettingsIcon },
  { id: "notifications" as SettingsTab, label: "Notifications", icon: Bell },
  { id: "billing" as SettingsTab, label: "Billing", icon: CreditCard },
  { id: "integrations" as SettingsTab, label: "Integrations", icon: Network },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("integrations");
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@company.com",
    phone: "+1 (555) 123-4567",
  });
  
  const [securityData, setSecurityData] = useState({
    currentPassword: "••••••••",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
  });
  
  const [preferencesData, setPreferencesData] = useState({
    theme: "light",
    language: "english",
    timezone: "utc-8",
  });

  const [notificationsData, setNotificationsData] = useState({
    projectUpdates: true,
    taskAssignments: true,
    teamMessages: true,
    systemUpdates: true,
    frequency: "real-time",
  });

  const [billingData, setBillingData] = useState({
    currentPlan: "Professional Plan",
    planPrice: "$29/month",
    billingCycle: "Billed monthly",
    cardType: "VISA",
    cardNumber: "•••• •••• •••• 4242",
    cardExpiry: "12/25",
    invoices: [
      { date: "Jan 1, 2024", amount: "$29.00", status: "Paid" },
      { date: "Dec 1, 2023", amount: "$29.00", status: "Paid" },
      { date: "Nov 1, 2023", amount: "$29.00", status: "Paid" },
    ],
  });

  const [integrationsData, setIntegrationsData] = useState({
    slack: { connected: true, name: "Slack", description: "Team communication and notifications" },
    github: { connected: true, name: "GitHub", description: "Code repository and version control" },
    jira: { connected: false, name: "Jira", description: "Issue tracking and project management" },
    googleDrive: { connected: true, name: "Google Drive", description: "File storage and document sharing" },
  });

  const getDisplayValue = (field: string, value: string) => {
    switch (field) {
      case "theme":
        return value === "light" ? "Light" : value === "dark" ? "Dark" : "Auto";
      case "language":
        return value === "english" ? "English" : value.charAt(0).toUpperCase() + value.slice(1);
      case "timezone":
        return value === "utc-8" ? "UTC-8 (Pacific)" : value;
      default:
        return value;
    }
  };
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
  };
  
  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };
  
  const handlePreferenceChange = (field: string, value: string) => {
    setPreferencesData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean | string) => {
    setNotificationsData(prev => ({ ...prev, [field]: value }));
  };

  const handleIntegrationChange = (integration: string, connected: boolean) => {
    setIntegrationsData(prev => ({
      ...prev,
      [integration]: { ...prev[integration as keyof typeof prev], connected }
    }));
  };

  const renderProfileContent = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="text-center pb-6 border-b border-gray-200">
        <div className="relative inline-block">
          <Avatar className="h-32 w-32 ring-4 ring-white shadow-xl">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white text-3xl font-bold">
              SC
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg border-4 border-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-4">Sarah Chen</h2>
        <p className="text-gray-500">Professional Plan Member</p>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          Personal Information
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                First Name
              </label>
              <Input
                value={profileData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Last Name
              </label>
              <Input
                value={profileData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Email Address
            </label>
            <Input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter your email address"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Phone Number
            </label>
            <Input
              value={profileData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
          Cancel
        </Button>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
          Save Changes
        </Button>
      </div>
    </div>
  );

  const renderSecurityContent = () => (
    <div className="space-y-8">
      {/* Security Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Account Security</h3>
            <p className="text-sm text-gray-600">Keep your account safe with strong passwords and 2FA</p>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          Change Password
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Current Password
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  value={securityData.currentPassword}
                  onChange={(e) => handleSecurityChange("currentPassword", e.target.value)}
                  className="bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500 pr-10 transition-all duration-200"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.new ? "text" : "password"}
                  value={securityData.newPassword}
                  onChange={(e) => handleSecurityChange("newPassword", e.target.value)}
                  className="bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500 pr-10 transition-all duration-200"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                type={showPasswords.confirm ? "text" : "password"}
                value={securityData.confirmPassword}
                onChange={(e) => handleSecurityChange("confirmPassword", e.target.value)}
                className="bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500 pr-10 transition-all duration-200"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg">
            Update Password
          </Button>
        </div>
      </div>
      
      {/* Two-Factor Authentication Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          Two-Factor Authentication
        </h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Enable 2FA</p>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
          </div>
          <button
            onClick={() => handleSecurityChange("twoFactorEnabled", !securityData.twoFactorEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              securityData.twoFactorEnabled ? 'bg-gradient-to-r from-purple-500 to-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                securityData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        
        {securityData.twoFactorEnabled && (
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">Scan this QR code with your authenticator app:</p>
            </div>
            <div className="bg-white rounded-lg p-6 w-56 h-56 flex items-center justify-center border border-gray-300 shadow-sm">
              <div className="text-center text-gray-500">
                <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-3 border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                    </svg>
                    <span className="text-xs text-gray-400">QR Code</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">QR Code Placeholder</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderPreferencesContent = () => (
    <div className="space-y-6">
      {/* Theme Preference */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Sun className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Theme</h3>
            <p className="text-sm text-gray-500">Choose your preferred theme</p>
          </div>
        </div>
        <Select value={preferencesData.theme} onValueChange={(value) => handlePreferenceChange("theme", value)}>
          <SelectTrigger className="w-40 bg-white border-gray-300">
            <SelectValue placeholder={getDisplayValue("theme", preferencesData.theme)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="auto">Auto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Language Preference */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Globe className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Language</h3>
            <p className="text-sm text-gray-500">Select your preferred language</p>
          </div>
        </div>
        <Select value={preferencesData.language} onValueChange={(value) => handlePreferenceChange("language", value)}>
          <SelectTrigger className="w-40 bg-white border-gray-300">
            <SelectValue placeholder={getDisplayValue("language", preferencesData.language)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="german">German</SelectItem>
            <SelectItem value="chinese">Chinese</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timezone Preference */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Timezone</h3>
            <p className="text-sm text-gray-500">Set your local timezone</p>
          </div>
        </div>
        <Select value={preferencesData.timezone} onValueChange={(value) => handlePreferenceChange("timezone", value)}>
          <SelectTrigger className="w-40 bg-white border-gray-300">
            <SelectValue placeholder={getDisplayValue("timezone", preferencesData.timezone)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="utc-8">UTC-8 (Pacific)</SelectItem>
            <SelectItem value="utc-7">UTC-7 (Mountain)</SelectItem>
            <SelectItem value="utc-6">UTC-6 (Central)</SelectItem>
            <SelectItem value="utc-5">UTC-5 (Eastern)</SelectItem>
            <SelectItem value="utc+0">UTC+0 (GMT)</SelectItem>
            <SelectItem value="utc+1">UTC+1 (CET)</SelectItem>
            <SelectItem value="utc+5:30">UTC+5:30 (IST)</SelectItem>
            <SelectItem value="utc+8">UTC+8 (CST)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderNotificationsContent = () => (
    <div className="space-y-6">
      {/* Notification Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
        
        {/* Project Updates */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Project Updates</h4>
            <p className="text-sm text-gray-500">Get notified about project progress and milestones</p>
          </div>
          <button
            onClick={() => handleNotificationChange("projectUpdates", !notificationsData.projectUpdates)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationsData.projectUpdates ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsData.projectUpdates ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Task Assignments */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Task Assignments</h4>
            <p className="text-sm text-gray-500">Receive notifications when tasks are assigned to you</p>
          </div>
          <button
            onClick={() => handleNotificationChange("taskAssignments", !notificationsData.taskAssignments)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationsData.taskAssignments ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsData.taskAssignments ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Team Messages */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Team Messages</h4>
            <p className="text-sm text-gray-500">Get alerts for team communications and mentions</p>
          </div>
          <button
            onClick={() => handleNotificationChange("teamMessages", !notificationsData.teamMessages)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationsData.teamMessages ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsData.teamMessages ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* System Updates */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">System Updates</h4>
            <p className="text-sm text-gray-500">Important system maintenance and feature updates</p>
          </div>
          <button
            onClick={() => handleNotificationChange("systemUpdates", !notificationsData.systemUpdates)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationsData.systemUpdates ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsData.systemUpdates ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Notification Frequency */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Notification Frequency</h4>
            <p className="text-sm text-gray-500">How often would you like to receive notifications?</p>
          </div>
          <Select value={notificationsData.frequency} onValueChange={(value) => handleNotificationChange("frequency", value)}>
            <SelectTrigger className="w-40 bg-white border-gray-300">
              <SelectValue placeholder={notificationsData.frequency === "real-time" ? "Real-time" : notificationsData.frequency} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="real-time">Real-time</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderBillingContent = () => (
    <div className="space-y-6">
      {/* Current Plan Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Plan</h3>
            <div className="space-y-1">
              <p className="text-lg font-medium text-gray-900">{billingData.currentPlan}</p>
              <p className="text-sm text-gray-500">{billingData.planPrice} • {billingData.billingCycle}</p>
            </div>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Change Plan
          </Button>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                {billingData.cardType}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{billingData.cardNumber}</p>
                <p className="text-sm text-gray-500">Expires {billingData.cardExpiry}</p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
            Update
          </Button>
        </div>
      </div>

      {/* Recent Invoices Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
          <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 text-sm font-medium">
            <Download className="h-4 w-4" />
            <span>Download All</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {billingData.invoices.map((invoice, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{invoice.date}</p>
                  <p className="text-sm text-gray-500">{invoice.amount}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-green-600">{invoice.status}</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIntegrationsContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Connected Apps</h3>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Integrations List */}
      <div className="space-y-4">
        {/* Slack */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 15a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7-1a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7-1a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{integrationsData.slack.name}</h4>
              <p className="text-sm text-gray-500">{integrationsData.slack.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-green-600">Connected</span>
            <button
              onClick={() => handleIntegrationChange("slack", !integrationsData.slack.connected)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                integrationsData.slack.connected ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  integrationsData.slack.connected ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* GitHub */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{integrationsData.github.name}</h4>
              <p className="text-sm text-gray-500">{integrationsData.github.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-green-600">Connected</span>
            <button
              onClick={() => handleIntegrationChange("github", !integrationsData.github.connected)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                integrationsData.github.connected ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  integrationsData.github.connected ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Jira */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13c2.493 0 4.52-1.89 4.52-4.215 0-2.786-2.311-4.214-4.52-4.214v2.214zM5.736 0C2.571 0 0 2.572 0 5.736h11.571C11.571 2.572 8.9 0 5.736 0z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{integrationsData.jira.name}</h4>
              <p className="text-sm text-gray-500">{integrationsData.jira.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-400">Not Connected</span>
            <X className="h-4 w-4 text-gray-400" />
            <button
              onClick={() => handleIntegrationChange("jira", !integrationsData.jira.connected)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                integrationsData.jira.connected ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  integrationsData.jira.connected ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Google Drive */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{integrationsData.googleDrive.name}</h4>
              <p className="text-sm text-gray-500">{integrationsData.googleDrive.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-green-600">Connected</span>
            <button
              onClick={() => handleIntegrationChange("googleDrive", !integrationsData.googleDrive.connected)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                integrationsData.googleDrive.connected ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  integrationsData.googleDrive.connected ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileContent();
      case "security":
        return renderSecurityContent();
      case "preferences":
        return renderPreferencesContent();
      case "notifications":
        return renderNotificationsContent();
      case "billing":
        return renderBillingContent();
      case "integrations":
        return renderIntegrationsContent();
      default:
        return renderProfileContent();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 p-6 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              {/* Left Side - Settings Identity */}
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <SettingsIcon className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Owner: Sarah Chen</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Last updated: Mar 15, 2024</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>6 sections configured</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-medium">SC</div>
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white font-medium">JD</div>
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white font-medium">MJ</div>
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs text-white font-medium">AK</div>
                    </div>
                    <span className="text-sm text-gray-500">4 team members</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Actions & Status */}
              <div className="flex flex-col items-end space-y-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </Button>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between w-full text-xs text-gray-500">
                  <span>5 of 6 sections configured</span>
                  <span>1 section remaining</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex space-x-6">
            {/* Left Sidebar */}
            <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right Content */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {settingsTabs.find(tab => tab.id === activeTab)?.label} Information
              </h2>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 