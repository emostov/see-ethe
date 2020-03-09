
export const addressTypeTags = () => (
  $.ajax({
    method: 'GET',
    url: '/api/address_type_tags',
  })
);

export const addressTypeTag = (address) => (
  $.ajax({
    method: 'GET',
    url: `/api/address_type_tag/${address}`,
  })
);

