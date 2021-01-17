def clean_dynamo_object(obj):
  for item in obj.get('Items'):
    for key, val in item.items():
      for final_val in val.values():
        item[key] = final_val

  return obj.get('Items')
