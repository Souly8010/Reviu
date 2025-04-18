const { addDays, isAfter } = require('date-fns');

class TrialManager {
  static TRIAL_DURATION_DAYS = 14;

  static createTrialSubscription(userId) {
    const startDate = new Date();
    const endDate = addDays(startDate, this.TRIAL_DURATION_DAYS);
    
    return {
      userId,
      planType: 'trial',
      startDate,
      endDate,
      hasProfessionalAccess: true
    };
  }

  static isTrialActive(subscription) {
    if (!subscription || subscription.planType !== 'trial') {
      return false;
    }

    const now = new Date();
    return !isAfter(now, new Date(subscription.endDate));
  }

  static getRemainingDays(subscription) {
    if (!subscription || subscription.planType !== 'trial') {
      return 0;
    }

    const now = new Date();
    const endDate = new Date(subscription.endDate);
    const diffTime = endDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

module.exports = TrialManager;
