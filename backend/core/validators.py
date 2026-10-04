import os
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_file_size(value):
    filesize = value.size
    
    if filesize > 5242880:
        raise ValidationError(_("The maximum file size that can be uploaded is 5MB"))
    else:
        return value

def validate_research_file_size(value):
    filesize = value.size
    
    if filesize > 10485760:
        raise ValidationError(_("The maximum file size that can be uploaded for research documents is 10MB"))
    else:
        return value

def validate_image_extension(value):
    ext = os.path.splitext(value.name)[1].lower()
    valid_extensions = ['.jpg', '.jpeg', '.png', '.webp']
    if ext not in valid_extensions:
        raise ValidationError(_('Unsupported file extension. Allowed extensions are: .jpg, .jpeg, .png, .webp'))
    
    # MIME type check can be done here or in forms/serializers. For simplicity and robustness, we do it here if possible or rely on forms. 
    # But for a robust system, we check extension at model level.

def validate_pdf_extension(value):
    ext = os.path.splitext(value.name)[1].lower()
    if ext != '.pdf':
        raise ValidationError(_('Unsupported file extension. Only .pdf files are allowed.'))

def validate_no_executable(value):
    ext = os.path.splitext(value.name)[1].lower()
    dangerous_extensions = ['.exe', '.bat', '.cmd', '.sh', '.js', '.php', '.html', '.svg', '.sh']
    if ext in dangerous_extensions:
        raise ValidationError(_('Dangerous file extensions are not allowed.'))
