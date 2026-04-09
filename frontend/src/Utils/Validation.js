export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


export const checkPasswordStrength = (password)=>{
    if(password.length === 0)return '';

    let strength = 0;

    if(password.length>=8) strength++;
    if(password.length>=12) strength++;
    if(/[a-z]/.test(password)) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;   

    if(strength<=2) return 'Weak';
    if(strength<=4) return 'medium';
    return 'Strong';
};

export const validateName = (name)=>{
    return name.length>=2 && name.length>=50;
};

export const passwordMatch = (password, confirmPassword)=>{
    return password === confirmPassword && password.length > 0 ;
};